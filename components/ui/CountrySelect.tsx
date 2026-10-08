"use client";

import { useEffect, useId, useMemo, useState } from "react";

type Country = { code: string; name: string; flag: string };
type RestCountry = { cca2: string; flag?: string; name: { common: string } };

let countryRequest: Promise<Country[]> | undefined;

function loadCountries() {
  countryRequest ??= fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag")
    .then((response) => {
      if (!response.ok) throw new Error("Country request failed");
      return response.json() as Promise<RestCountry[]>;
    })
    .then((items) =>
      items
        .map((country) => ({
          code: country.cca2.toUpperCase(),
          name: country.name.common,
          flag: country.flag ?? "",
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    );
  return countryRequest;
}

export function CountrySelect({ value, onChange, className, id }: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
  id?: string;
}) {
  const generatedId = useId();
  const inputId = id ?? `country-${generatedId}`;
  const listId = `${inputId}-listbox`;
  const [countries, setCountries] = useState<Country[]>([]);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let active = true;
    loadCountries()
      .then((items) => active && setCountries(items))
      .catch(() => active && setFailed(true));
    return () => { active = false; };
  }, []);

  const selected = countries.find((country) => country.code === value);
  const selectedText = selected
    ? `${selected.flag ? `${selected.flag} ` : ""}${selected.name} (${selected.code})`
    : value;

  useEffect(() => {
    if (!open) setQuery(selectedText);
  }, [open, selectedText]);

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term || query === selectedText) return countries;
    return countries.filter((country) =>
      country.name.toLocaleLowerCase().includes(term) ||
      country.code.toLocaleLowerCase().includes(term),
    );
  }, [countries, query, selectedText]);

  function choose(country: Country) {
    onChange(country.code);
    setQuery(`${country.flag ? `${country.flag} ` : ""}${country.name} (${country.code})`);
    setOpen(false);
  }

  if (failed) {
    return (
      <input
        id={inputId}
        className={className}
        value={value}
        maxLength={2}
        aria-label="Two-letter country code"
        onChange={(event) => onChange(event.target.value.toUpperCase().slice(0, 2))}
      />
    );
  }

  return (
    <div className="relative">
      <input
        id={inputId}
        className={className}
        value={query}
        role="combobox"
        aria-label="Search and select country"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        aria-activedescendant={open && filtered[activeIndex] ? `${listId}-${filtered[activeIndex].code}` : undefined}
        autoComplete="off"
        spellCheck={false}
        disabled={countries.length === 0}
        placeholder={countries.length === 0 ? "Loading countries…" : "Search country or code"}
        onFocus={(event) => {
          setOpen(true);
          setActiveIndex(0);
          event.currentTarget.select();
        }}
        onBlur={() => {
          setOpen(false);
          setQuery(selectedText);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          } else if (event.key === "Enter" && open && filtered[activeIndex]) {
            event.preventDefault();
            choose(filtered[activeIndex]);
          } else if (event.key === "Escape") {
            setOpen(false);
            setQuery(selectedText);
            event.currentTarget.blur();
          }
        }}
      />

      {open && countries.length > 0 ? (
        <div id={listId} role="listbox" className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto overscroll-contain rounded-lg border border-border bg-background p-1 shadow-xl">
          {filtered.length > 0 ? filtered.map((country, index) => (
            <div
              id={`${listId}-${country.code}`}
              key={country.code}
              role="option"
              aria-selected={country.code === value}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-normal ${index === activeIndex ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"}`}
              onMouseDown={(event) => {
                event.preventDefault();
                choose(country);
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="mr-2" aria-hidden="true">{country.flag}</span>
              {country.name}
              <span className="ml-1 text-muted-foreground">({country.code})</span>
            </div>
          )) : (
            <p className="px-3 py-3 text-sm font-normal text-muted-foreground">No countries found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
