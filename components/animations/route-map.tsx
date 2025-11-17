"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Truck, MapPin, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { getRoute } from "@/app/actions/routing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RouteMapProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  originLabel?: string;
  destinationLabel?: string;
}

const tileCache = new Map<string, HTMLImageElement>();

export function RouteMap({
  origin,
  destination,
  originLabel,
  destinationLabel,
}: RouteMapProps) {
  const mapCanvasRef = useRef<HTMLCanvasElement>(null);
  const routeCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoadingRoute, setIsLoadingRoute] = useState(true);
  const [error, setError] = useState<string>("");
  const [zoom, setZoom] = useState(12);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    [],
  );
  const [hasError, setHasError] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPanOffset, setLastPanOffset] = useState({ x: 0, y: 0 });
  const [isMapReady, setIsMapReady] = useState(false);
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);
  const tileLoadTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null,
  );

  const latLngToPixel = (
    lat: number,
    lng: number,
    centerLat: number,
    centerLng: number,
    zoom: number,
    width: number,
    height: number,
    panX = 0,
    panY = 0,
  ) => {
    const scale = (256 * Math.pow(2, zoom)) / (2 * Math.PI);

    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const centerLatRad = (centerLat * Math.PI) / 180;
    const centerLngRad = (centerLng * Math.PI) / 180;

    const x = scale * (lngRad - centerLngRad) + width / 2 + panX;
    const y =
      scale *
        (Math.log(Math.tan(Math.PI / 4 + centerLatRad / 2)) -
          Math.log(Math.tan(Math.PI / 4 + latRad / 2))) +
      height / 2 +
      panY;

    return { x, y };
  };

  const loadMapTiles = useCallback(
    async (
      canvas: HTMLCanvasElement,
      centerLat: number,
      centerLng: number,
      zoomLevel: number,
      panX = 0,
      panY = 0,
    ) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, width, height);

      const tileZoom = Math.max(3, Math.min(18, Math.floor(zoomLevel)));
      const scale = Math.pow(2, tileZoom);
      const centerTileX = ((centerLng + 180) / 360) * scale;
      const centerTileY =
        ((1 -
          Math.log(
            Math.tan((centerLat * Math.PI) / 180) +
              1 / Math.cos((centerLat * Math.PI) / 180),
          ) /
            Math.PI) /
          2) *
        scale;

      const tileSize = 256;
      const tilesX = Math.ceil(width / tileSize) + 2;
      const tilesY = Math.ceil(height / tileSize) + 2;

      const pixelOffsetX = (centerTileX - Math.floor(centerTileX)) * tileSize;
      const pixelOffsetY = (centerTileY - Math.floor(centerTileY)) * tileSize;

      const tilePromises: Promise<void>[] = [];

      for (
        let dx = -Math.floor(tilesX / 2);
        dx <= Math.ceil(tilesX / 2);
        dx++
      ) {
        for (
          let dy = -Math.floor(tilesY / 2);
          dy <= Math.ceil(tilesY / 2);
          dy++
        ) {
          const tx = Math.floor(centerTileX) + dx;
          const ty = Math.floor(centerTileY) + dy;

          if (tx < 0 || ty < 0 || tx >= scale || ty >= scale) continue;

          const pixelX = width / 2 - pixelOffsetX + dx * tileSize + panX;
          const pixelY = height / 2 - pixelOffsetY + dy * tileSize + panY;

          const cacheKey = `${tileZoom}-${tx}-${ty}`;
          const cachedTile = tileCache.get(cacheKey);

          if (cachedTile && cachedTile.complete) {
            ctx.drawImage(cachedTile, pixelX, pixelY, tileSize, tileSize);
            continue;
          }

          const tilePromise = new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = `https://tile.openstreetmap.org/${tileZoom}/${tx}/${ty}.png`;

            img.onload = () => {
              tileCache.set(cacheKey, img);
              ctx.drawImage(img, pixelX, pixelY, tileSize, tileSize);
              resolve();
            };

            img.onerror = () => {
              ctx.fillStyle = "#e5e7eb";
              ctx.fillRect(pixelX, pixelY, tileSize, tileSize);
              ctx.strokeStyle = "#d1d5db";
              ctx.strokeRect(pixelX, pixelY, tileSize, tileSize);
              resolve();
            };
          });

          tilePromises.push(tilePromise);
        }
      }

      await Promise.all(tilePromises);
    },
    [],
  );

  const drawRoute = useCallback(
    (
      canvas: HTMLCanvasElement,
      coords: [number, number][],
      centerLat: number,
      centerLng: number,
      zoomLevel: number,
      isError: boolean,
      panX = 0,
      panY = 0,
    ) => {
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (coords.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = isError ? "#94a3b8" : "#3b82f6";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 10;

      if (isError) {
        ctx.setLineDash([15, 15]);
      }

      coords.forEach((coord, index) => {
        const pixel = latLngToPixel(
          coord[0],
          coord[1],
          centerLat,
          centerLng,
          zoomLevel,
          width,
          height,
          panX,
          panY,
        );
        if (index === 0) {
          ctx.moveTo(pixel.x, pixel.y);
        } else {
          ctx.lineTo(pixel.x, pixel.y);
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);

      const originPixel = latLngToPixel(
        origin.lat,
        origin.lng,
        centerLat,
        centerLng,
        zoomLevel,
        width,
        height,
        panX,
        panY,
      );

      ctx.shadowColor = "rgba(34, 197, 94, 0.6)";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.fillStyle = "#22c55e";
      ctx.arc(originPixel.x, originPixel.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.arc(originPixel.x, originPixel.y, 6, 0, Math.PI * 2);
      ctx.fill();

      const destPixel = latLngToPixel(
        destination.lat,
        destination.lng,
        centerLat,
        centerLng,
        zoomLevel,
        width,
        height,
        panX,
        panY,
      );

      ctx.shadowColor = "rgba(255, 165, 0, 0.6)";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.fillStyle = "#FFA500";
      ctx.arc(destPixel.x, destPixel.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.arc(destPixel.x, destPixel.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;

      ctx.strokeText("PU", originPixel.x, originPixel.y - 28);
      ctx.fillText("PU", originPixel.x, originPixel.y - 28);

      ctx.strokeText("DEL", destPixel.x, destPixel.y - 28);
      ctx.fillText("DEL", destPixel.x, destPixel.y - 28);
    },
    [origin, destination],
  );

  const renderMap = useCallback(() => {
    if (
      !mapCanvasRef.current ||
      !routeCanvasRef.current ||
      !containerRef.current ||
      routeCoordinates.length === 0
    )
      return;

    const mapCanvas = mapCanvasRef.current;
    const routeCanvas = routeCanvasRef.current;

    if (tileLoadTimerRef.current) {
      clearTimeout(tileLoadTimerRef.current);
    }

    drawRoute(
      routeCanvas,
      routeCoordinates,
      centerLat,
      centerLng,
      zoom,
      hasError,
      panOffset.x,
      panOffset.y,
    );

    tileLoadTimerRef.current = setTimeout(() => {
      loadMapTiles(
        mapCanvas,
        centerLat,
        centerLng,
        zoom,
        panOffset.x,
        panOffset.y,
      );
    }, 100);
  }, [
    routeCoordinates,
    hasError,
    centerLat,
    centerLng,
    zoom,
    panOffset,
    drawRoute,
    loadMapTiles,
  ]);

  const calculateOptimalZoom = useCallback(
    (
      origin: { lat: number; lng: number },
      destination: { lat: number; lng: number },
    ): number => {
      const R = 6371;
      const φ1 = (origin.lat * Math.PI) / 180;
      const φ2 = (destination.lat * Math.PI) / 180;
      const Δφ = ((destination.lat - origin.lat) * Math.PI) / 180;
      const Δλ = ((destination.lng - origin.lng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = R * c;
      const distanceMiles = distanceKm * 0.621371;

      if (distanceMiles > 3000) return 3;
      if (distanceMiles > 2000) return 4;
      if (distanceMiles > 1000) return 5;
      if (distanceMiles > 500) return 6;
      if (distanceMiles > 250) return 7;
      if (distanceMiles > 100) return 8;
      if (distanceMiles > 50) return 10;
      if (distanceMiles > 25) return 11;
      return 12;
    },
    [],
  );

  useEffect(() => {
    const fetchRoute = async () => {
      console.log("[v0] 🗺️ Fetching route for new locations");
      setIsLoadingRoute(true);
      setIsMapReady(false);
      setError("");
      setHasError(false);

      try {
        const result = await getRoute(origin, destination);

        const miles = result.distance / 1609.34;
        const hours = result.duration / 3600;

        setDistance(miles);
        setDuration(hours);
        setRouteCoordinates(result.coordinates);

        if (result.error) {
          setError(result.error);
          setHasError(true);
        }

        const newCenterLat = (origin.lat + destination.lat) / 2;
        const newCenterLng = (origin.lng + destination.lng) / 2;
        const optimalZoom = calculateOptimalZoom(origin, destination);

        setCenterLat(newCenterLat);
        setCenterLng(newCenterLng);
        setZoom(optimalZoom);
        setPanOffset({ x: 0, y: 0 });

        setIsLoadingRoute(false);
      } catch (err) {
        console.error("[v0] ❌ Route fetch error:", err);
        setError("Failed to load route");
        setHasError(true);
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [origin, destination, calculateOptimalZoom]);

  useEffect(() => {
    if (
      !mapCanvasRef.current ||
      !routeCanvasRef.current ||
      !containerRef.current ||
      routeCoordinates.length === 0
    )
      return;

    const mapCanvas = mapCanvasRef.current;
    const routeCanvas = routeCanvasRef.current;
    const container = containerRef.current;

    const rect = container.getBoundingClientRect();
    mapCanvas.width = rect.width;
    mapCanvas.height = rect.height;
    routeCanvas.width = rect.width;
    routeCanvas.height = rect.height;

    loadMapTiles(mapCanvas, centerLat, centerLng, zoom, 0, 0).then(() => {
      drawRoute(
        routeCanvas,
        routeCoordinates,
        centerLat,
        centerLng,
        zoom,
        hasError,
        0,
        0,
      );
      setIsMapReady(true);
    });
  }, [
    routeCoordinates,
    hasError,
    centerLat,
    centerLng,
    zoom,
    drawRoute,
    loadMapTiles,
  ]);

  useEffect(() => {
    if (!isMapReady) return;
    renderMap();
  }, [panOffset, zoom, isMapReady, renderMap]);

  useEffect(() => {
    const handleResize = () => {
      if (
        !mapCanvasRef.current ||
        !routeCanvasRef.current ||
        !containerRef.current ||
        routeCoordinates.length === 0
      )
        return;

      const mapCanvas = mapCanvasRef.current;
      const routeCanvas = routeCanvasRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      mapCanvas.width = rect.width;
      mapCanvas.height = rect.height;
      routeCanvas.width = rect.width;
      routeCanvas.height = rect.height;

      renderMap();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [routeCoordinates, renderMap]);

  useEffect(() => {
    const routeCanvas = routeCanvasRef.current;
    if (!routeCanvas || !isMapReady) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setLastPanOffset(panOffset);
      routeCanvas.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setPanOffset({
        x: lastPanOffset.x + dx,
        y: lastPanOffset.y + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      routeCanvas.style.cursor = "grab";
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        routeCanvas.style.cursor = "grab";
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -1 : 1;
        setZoom((prev) => Math.max(3, Math.min(18, prev + delta)));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Single touch - pan
        e.preventDefault();
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX, y: touch.clientY });
        setLastPanOffset(panOffset);
      } else if (e.touches.length === 2) {
        // Two touches - pinch zoom
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY,
        );
        setLastTouchDistance(distance);
        setIsDragging(false);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        // Single touch - pan
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - dragStart.x;
        const dy = touch.clientY - dragStart.y;

        setPanOffset({
          x: lastPanOffset.x + dx,
          y: lastPanOffset.y + dy,
        });
      } else if (e.touches.length === 2) {
        // Two touches - pinch zoom
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY,
        );

        if (lastTouchDistance !== null) {
          const delta = distance > lastTouchDistance ? 0.5 : -0.5;
          setZoom((prev) => Math.max(3, Math.min(18, prev + delta)));
        }

        setLastTouchDistance(distance);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        setIsDragging(false);
        setLastTouchDistance(null);
      } else if (e.touches.length === 1) {
        // One finger left, reset for panning
        const touch = e.touches[0];
        setDragStart({ x: touch.clientX, y: touch.clientY });
        setLastPanOffset(panOffset);
        setLastTouchDistance(null);
      }
    };

    routeCanvas.style.cursor = "grab";

    routeCanvas.addEventListener("mousedown", handleMouseDown);
    routeCanvas.addEventListener("mousemove", handleMouseMove);
    routeCanvas.addEventListener("mouseup", handleMouseUp);
    routeCanvas.addEventListener("mouseleave", handleMouseLeave);
    routeCanvas.addEventListener("wheel", handleWheel, { passive: false });

    routeCanvas.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    routeCanvas.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    routeCanvas.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    return () => {
      routeCanvas.removeEventListener("mousedown", handleMouseDown);
      routeCanvas.removeEventListener("mousemove", handleMouseMove);
      routeCanvas.removeEventListener("mouseup", handleMouseUp);
      routeCanvas.removeEventListener("mouseleave", handleMouseLeave);
      routeCanvas.removeEventListener("wheel", handleWheel);

      routeCanvas.removeEventListener("touchstart", handleTouchStart);
      routeCanvas.removeEventListener("touchmove", handleTouchMove);
      routeCanvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isDragging,
    dragStart,
    lastPanOffset,
    panOffset,
    isMapReady,
    lastTouchDistance,
  ]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 3));
  };

  const handleFitBounds = () => {
    const optimalZoom = calculateOptimalZoom(origin, destination);
    const newCenterLat = (origin.lat + destination.lat) / 2;
    const newCenterLng = (origin.lng + destination.lng) / 2;

    setCenterLat(newCenterLat);
    setCenterLng(newCenterLng);
    setZoom(optimalZoom);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative w-full">
        <div
          ref={containerRef}
          className="border-border h-64 w-full overflow-hidden rounded-xl border-2 bg-gray-900 shadow-2xl sm:h-80 md:h-96"
          style={{ minHeight: "256px" }}
        >
          <canvas
            ref={mapCanvasRef}
            className="absolute inset-0 h-full w-full"
          />
          <canvas
            ref={routeCanvasRef}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <Button
            type="button"
            size="icon"
            className="h-9 w-9 border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl sm:h-11 sm:w-11"
            onClick={handleZoomIn}
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            className="h-9 w-9 border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl sm:h-11 sm:w-11"
            onClick={handleZoomOut}
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            className="h-9 w-9 border border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl sm:h-11 sm:w-11"
            onClick={handleFitBounds}
            title="Fit to route"
          >
            <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 z-10 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white sm:text-xs">
          <span className="hidden sm:inline">
            Drag to pan • Ctrl+Scroll to zoom
          </span>
          <span className="sm:hidden">Drag to pan • Pinch to zoom</span>
        </div>

        {isLoadingRoute && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-gray-900/90">
            <div className="text-center">
              <div className="border-primary/30 border-t-primary mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4" />
              <p className="text-sm font-medium text-white">Loading route...</p>
            </div>
          </div>
        )}
      </div>

      <Card className="from-primary/5 to-accent/5 border-2 bg-linear-to-r p-3 sm:p-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md sm:h-11 sm:w-11">
                <Truck
                  size={18}
                  className="text-primary-foreground sm:h-5 sm:w-5"
                />
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-medium sm:text-xs">
                  Distance
                </p>
                <p className="text-foreground text-lg font-bold sm:text-xl md:text-2xl">
                  {isLoadingRoute ? "..." : `${distance.toFixed(0)} mi`}
                </p>
              </div>
            </div>

            <div className="bg-border hidden h-12 w-px sm:block" />

            <div className="flex items-center gap-2">
              <div className="bg-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md sm:h-11 sm:w-11">
                <MapPin
                  size={18}
                  className="text-accent-foreground sm:h-5 sm:w-5"
                />
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-medium sm:text-xs">
                  Est. Time
                </p>
                <p className="text-foreground text-lg font-bold sm:text-xl md:text-2xl">
                  {isLoadingRoute
                    ? "..."
                    : duration < 1
                      ? `${Math.ceil(duration * 60)} min`
                      : `${Math.ceil(duration)} hrs`}
                </p>
              </div>
            </div>
          </div>

          {!isLoadingRoute && !error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 sm:text-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-600 shadow-lg" />
              <span>Live Route</span>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-2 text-xs font-medium text-orange-600 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-orange-600" />
            {error}
          </p>
        )}
      </Card>
    </div>
  );
}
