import { useEffect, useState } from "react";

interface useDebounceProps {
  searchValue: string;
  delay?: number;
}

export const useDebounce = ({
  delay = 3000,
  searchValue,
}: useDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue === "" && !isDebouncing) {
      return setDebouncedValue("");
    }
    setIsDebouncing(true);

    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
      setIsDebouncing(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return { debouncedValue, isDebouncing };
};
