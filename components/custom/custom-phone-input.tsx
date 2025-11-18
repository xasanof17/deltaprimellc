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
        ".react-tel-input .country-list",
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
            ".react-tel-input .search-box",
          ) as HTMLInputElement | null;
          if (nativeSearch) {
            nativeSearch.value = val;
            nativeSearch.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }}
      />,
    );

    return () => {
      searchRootRef.current?.unmount();
      searchRootRef.current = null;
    };
  }, [isDropdownOpen, search]);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label className="text-foreground text-sm font-medium">
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
          id: "phone",
          name: "phone",
          required,
          placeholder,
        }}
        containerStyle={{
          width: "100%",
        }}
        inputStyle={{
          width: "100%",
        }}
        inputClass={cn(
          "h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2 text-foreground focus:ring-2 focus:ring-ring focus:outline-none",
          error && "border-red-500 ring-red-500/30",
        )}
        buttonClass={cn(
          "border border-input rounded-l-md bg-card hover:bg-muted transition flex items-center justify-center",
          error && "border-red-500",
        )}
        searchClass="hidden" // hide built-in search box
      />

      {error && <p className="mt-1 text-xs text-red-500">{String(error)}</p>}
    </div>
  );
}
