"use client";

import React, { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { CommandInput } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { createRoot, Root } from "react-dom/client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label?: string | React.ReactNode;
  required?: boolean;
  error?: string | boolean;
  defaultCountry?: string;
  placeholder?: string;
  className?: string;
};

export function CustomPhoneInput({
  value,
  onChange,
  label,
  required,
  error,
  defaultCountry = "us",
  placeholder = "Enter phone number",
  className,
}: Props) {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRootRef = useRef<Root | null>(null);

  // Observe dropdown open/close
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dropdown = document.querySelector(
        ".react-tel-input .country-list"
      ) as HTMLDivElement | null;

      if (dropdown && dropdown.style.display !== "none") {
        setDropdownOpen(true);
        dropdownRef.current = dropdown;
      } else {
        setDropdownOpen(false);
        dropdownRef.current = null;
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Inject ShadCN search input into dropdown
  useEffect(() => {
    if (!dropdownRef.current) return;

    const existing = dropdownRef.current.querySelector("#custom-search");
    if (existing) return;

    const wrapper = document.createElement("div");
    wrapper.id = "custom-search";
    wrapper.style.cssText = `
      position: sticky;
      top: 0;
      z-index: 2;
      background: var(--popover);
      border-bottom: 1px solid var(--border);
      padding: 8px;
    `;

    const mount = document.createElement("div");
    wrapper.appendChild(mount);
    dropdownRef.current.prepend(wrapper);

    const root = createRoot(mount);
    searchRootRef.current = root;

    root.render(
      <CommandInput
        placeholder="Search country..."
        value={search}
        onValueChange={(val) => {
          setSearch(val);
          const nativeSearch = document.querySelector(
            ".react-tel-input .search-box"
          ) as HTMLInputElement | null;
          if (nativeSearch) {
            nativeSearch.value = val;
            nativeSearch.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }}
      />
    );

    return () => {
      searchRootRef.current?.unmount();
      searchRootRef.current = null;
    };
  }, [isDropdownOpen, search]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <PhoneInput
        country={defaultCountry}
        value={value}
        onChange={(phone) => onChange("+" + phone.replace(/\D/g, ""))}
        disableSearchIcon
        disableDropdown
        inputProps={{
          required,
          placeholder,
        }}
        inputClass={cn(
          "h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2 text-foreground focus:ring-2 focus:ring-ring focus:outline-none",
          error && "border-red-500 ring-red-500/30"
        )}
        buttonClass={cn(
          "border border-input rounded-l-md bg-card hover:bg-muted transition flex items-center justify-center",
          error && "border-red-500"
        )}
        dropdownClass={cn(
          "absolute z-[9999] w-[300px] bg-popover text-popover-foreground border border-border rounded-md shadow-md mt-1 overflow-hidden",
          "max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent"
        )}
        searchClass="hidden" // hide built-in search box
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">{String(error)}</p>
      )}
    </div>
  );
}
