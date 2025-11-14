import { useEffect, useState } from 'react';

/**
 * @param value - 디바운싱 할 값
 * @param delay - 지연 시간(ms)
 * @returns 디바운싱 된 값
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedValue;
}
