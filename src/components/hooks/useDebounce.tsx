import React, { useState, useEffect } from 'react';

export default function useDebounce<T = string>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [delay, value]
  );

  return debouncedValue;
}