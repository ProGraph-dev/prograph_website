import { useState, useEffect } from 'react';
import api from './api';
import { useAppStore } from '../store';

// Generic hook for fetching data
export function useFetch<T>(url: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, setLoading]);

  return { data, error };
}

// Hook for posting data
export function usePost<T, R>(url: string) {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (payload: T) => {
    setIsLoading(true);
    try {
      const response = await api.post(url, payload);
      setData(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, data, error, isLoading };
}

// Hook for updating data
export function usePut<T, R>(url: string) {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async (payload: T) => {
    setIsLoading(true);
    try {
      const response = await api.put(url, payload);
      setData(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateData, data, error, isLoading };
}

// Hook for deleting data
export function useDelete(url: string) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteData = async () => {
    setIsLoading(true);
    try {
      await api.delete(url);
      setError(null);
      setIsDeleted(true);
      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteData, error, isLoading, isDeleted };
}