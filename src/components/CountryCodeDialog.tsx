"use client";

import React, { useState, useMemo } from "react";
import { Search, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { COUNTRIES, Country } from "@/data/countries";
import { useTranslations } from "next-intl";

interface CountryCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDialCode: string;
  onSelect: (country: Country) => void;
}

export function CountryCodeDialog({
  open,
  onOpenChange,
  selectedDialCode,
  onSelect,
}: CountryCodeDialogProps) {
  const t = useTranslations("Index");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return COUNTRIES;

    const cleanNumberQuery = query.replace(/^\+/, "");

    return COUNTRIES.filter((c) => {
      const matchesName = c.name.toLowerCase().includes(query);
      const cleanDialCode = c.dialCode.replace(/^\+/, "");
      const matchesDialCode =
        c.dialCode.includes(query) || cleanDialCode.startsWith(cleanNumberQuery);

      return matchesName || matchesDialCode;
    });
  }, [searchQuery]);

  const handleSelect = (country: Country) => {
    onSelect(country);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] max-w-sm rounded-3xl p-5 border border-border bg-white dark:bg-card shadow-2xl">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-base font-bold text-foreground">
            {t("result_page_select_country")}
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            {t("result_page_search_country")}
          </p>
        </DialogHeader>

        {/* 검색 인풋 */}
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("result_page_search_country")}
            className="pl-9 h-10 text-sm bg-gray-50/80 dark:bg-border"
            autoComplete="off"
          />
        </div>

        {/* 국가 목록 */}
        <div className="max-h-[340px] overflow-y-auto mt-2 space-y-1 pr-1">
          {filteredCountries.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No results found
            </div>
          ) : (
            filteredCountries.map((country) => {
              const isSelected = country.dialCode === selectedDialCode;
              return (
                <button
                  key={`${country.code}-${country.dialCode}`}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-mainBlue-50 dark:bg-mainBlue-950/40 text-mainBlue-600 dark:text-mainBlue-400 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-white/10 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-lg select-none shrink-0">{country.flag}</span>
                    <span className="truncate">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {country.dialCode}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-mainBlue-600 dark:text-mainBlue-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

