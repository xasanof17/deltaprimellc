import { useState, useEffect } from "react";

export type Country = {
  name: string;
  iso2: string;
  dialCode: string;
  flag: string;
};

const FALLBACK_COUNTRIES: Country[] = [
  {
    name: "United States",
    iso2: "us",
    dialCode: "1",
    flag: "https://flagcdn.com/w20/us.png",
  },
  {
    name: "United Kingdom",
    iso2: "gb",
    dialCode: "44",
    flag: "https://flagcdn.com/w20/gb.png",
  },
  {
    name: "Canada",
    iso2: "ca",
    dialCode: "1",
    flag: "https://flagcdn.com/w20/ca.png",
  },
  {
    name: "Australia",
    iso2: "au",
    dialCode: "61",
    flag: "https://flagcdn.com/w20/au.png",
  },
  {
    name: "Germany",
    iso2: "de",
    dialCode: "49",
    flag: "https://flagcdn.com/w20/de.png",
  },
  {
    name: "France",
    iso2: "fr",
    dialCode: "33",
    flag: "https://flagcdn.com/w20/fr.png",
  },
  {
    name: "India",
    iso2: "in",
    dialCode: "91",
    flag: "https://flagcdn.com/w20/in.png",
  },
  {
    name: "China",
    iso2: "cn",
    dialCode: "86",
    flag: "https://flagcdn.com/w20/cn.png",
  },
];

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem("countries_data");
    const cacheTimestamp = localStorage.getItem("countries_timestamp");

    if (cachedData && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp);
      const oneDay = 24 * 60 * 60 * 1000;
      if (age < oneDay) {
        setCountries(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags",
        );
        if (!response.ok) throw new Error("Failed to fetch countries");

        const data = await response.json();

        const transformedCountries: Country[] = (data as any[])
          .map((country): Country | null => {
            const root = country.idd?.root || "";
            const suffix = country.idd?.suffixes?.[0] || "";
            const dialCode = (root + suffix).replace("+", "");
            if (!dialCode) return null;
            return {
              name: country.name?.common || "",
              iso2: country.cca2?.toLowerCase() || "",
              dialCode,
              flag: `https://flagcdn.com/w20/${country.cca2?.toLowerCase()}.svg`,
            };
          })
          .filter((c): c is Country => c !== null)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        localStorage.setItem(
          "countries_data",
          JSON.stringify(transformedCountries),
        );
        localStorage.setItem("countries_timestamp", Date.now().toString());

        setCountries(transformedCountries);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setError("Failed to load countries. Using fallback list.");
        setCountries(FALLBACK_COUNTRIES);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
}
