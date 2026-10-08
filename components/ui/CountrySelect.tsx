"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

type Country = { code: string; name: string; flag: string };
type RestCountry = { cca2: string; flag?: string; name: { common: string } };

let countryRequest: Promise<Country[]> | undefined;

const ISO_CODES = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW".split(" ");

function flagFor(code: string) {
  return String.fromCodePoint(...[...code].map((letter) => 127397 + letter.charCodeAt(0)));
}

const fallbackCountries: Country[] = (() => {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  return ISO_CODES.map((code) => ({
    code,
    name: names.of(code) ?? code,
    flag: flagFor(code),
  })).sort((a, b) => a.name.localeCompare(b.name));
})();

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
    )
    .catch(() => fallbackCountries);
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
  const [countries, setCountries] = useState<Country[]>(fallbackCountries);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let active = true;
    loadCountries()
      .then((items) => active && setCountries(items));
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
        placeholder="Search country or code"
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
      <ChevronDownIcon
        className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      />

      {open ? (
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
