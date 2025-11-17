"use server";

interface RoutePoint {
  lat: number;
  lng: number;
}

interface RouteResponse {
  coordinates: [number, number][];
  distance: number; // in meters
  duration: number; // in seconds
  error?: string;
}

// Haversine formula for distance calculation (fallback)
function calculateDistance(point1: RoutePoint, point2: RoutePoint): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (point1.lat * Math.PI) / 180;
  const φ2 = (point2.lat * Math.PI) / 180;
  const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
  const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export async function getRoute(
  origin: RoutePoint,
  destination: RoutePoint,
): Promise<RouteResponse> {
  const apiKey = process.env.GRAPH_HOPPER_API_KEY;

  if (apiKey) {
    try {
      const url = `https://graphhopper.com/api/1/route?point=${origin.lat},${origin.lng}&point=${destination.lat},${destination.lng}&vehicle=car&locale=en&points_encoded=false&key=${apiKey}`;

      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (response.ok) {
        const data = await response.json();

        if (data.paths && data.paths.length > 0) {
          const path = data.paths[0];
          return {
            coordinates: path.points.coordinates.map((coord: number[]) => [
              coord[1],
              coord[0],
            ]) as [number, number][],
            distance: path.distance,
            duration: path.time / 1000, // Convert ms to seconds
          };
        }
      } else if (response.status === 400) {
        console.log(
          "GraphHopper: No driving route available between locations",
        );
      } else {
        console.error("GraphHopper API error:", response.status);
      }
    } catch (error) {
      console.error("GraphHopper request failed:", error);
    }
  }

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (response.ok) {
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        return {
          coordinates: route.geometry.coordinates.map((coord: number[]) => [
            coord[1],
            coord[0],
          ]) as [number, number][],
          distance: route.distance,
          duration: route.duration,
        };
      }
    } else if (response.status === 400) {
      console.log("OSRM: No driving route available between locations");
    } else {
      console.error("OSRM API error:", response.status);
    }
  } catch (error) {
    console.error("OSRM request failed:", error);
  }

  const distance = calculateDistance(origin, destination);
  const distanceInMiles = distance / 1609.34;

  let errorMessage =
    "No driving route available - showing straight-line distance";

  if (distanceInMiles > 500) {
    errorMessage =
      "Locations too far apart for driving route - showing straight-line distance";
  }

  return {
    coordinates: [
      [origin.lat, origin.lng],
      [destination.lat, destination.lng],
    ],
    distance,
    duration: distance / 20, // Rough estimate: 20 m/s average speed
    error: errorMessage,
  };
}
