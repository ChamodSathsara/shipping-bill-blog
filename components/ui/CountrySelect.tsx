"use client";

import { useEffect, useState } from "react";

type Country = { code: string; name: string; flag: string };
type RestCountry = { cca2: string; flag?: string; name: { common: string } };

export function CountrySelect({
  value,
  onChange,
  className,
  id,
}: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
  id?: string;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Country request failed");
        return response.json() as Promise<RestCountry[]>;
      })
      .then((items) =>
        setCountries(
          items
            .map((country) => ({
              code: country.cca2.toUpperCase(),
              name: country.name.common,
              flag: country.flag ?? "",
            }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        ),
      )
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  if (failed) {
    return (
      <input
        id={id}
        className={className}
        value={value}
        maxLength={2}
        aria-label="Two-letter country code"
        onChange={(event) => onChange(event.target.value.toUpperCase().slice(0, 2))}
      />
    );
  }

  return (
    <select
      id={id}
      className={className}
      value={value}
      disabled={countries.length === 0}
      aria-label="Country"
      onChange={(event) => onChange(event.target.value)}
    >
      {countries.length === 0 ? (
        <option value={value}>{value ? `Loading countries… (${value})` : "Loading countries…"}</option>
      ) : null}
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag ? `${country.flag} ` : ""}{country.name} ({country.code})
        </option>
      ))}
    </select>
  );
}
