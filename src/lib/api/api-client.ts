import { useState, useEffect, useRef } from 'react';

export interface ApiRequestConfig {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: Record<string, string>;
  token?: string;
  retryCount?: number;
  retryDelay?: number;
}

export interface ApiResponse<T = any> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  success: boolean;
  status: number | null;
  cancel: () => void;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for making API requests with automatic loading states,
 * error handling, and retry logic.
 */
export function useApi<T = any>(config: ApiRequestConfig): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef<number>(0);
  const configRef = useRef<ApiRequestConfig>(config);

  // Update the config ref when the config changes
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const executeRequest = async (): Promise<void> => {
    const {
      endpoint,
      method = 'GET',
      data,
      headers = {},
      token,
      retryCount = 3,
      retryDelay = 1000,
    } = configRef.current;

    // Reset state for new request
    setLoading(true);
    setError(null);
    setSuccess(false);
    setStatus(null);

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add authorization token if provided
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      // Prepare request options
      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        signal,
      };

      // Add body for non-GET requests
      if (method !== 'GET' && data) {
        requestOptions.body = JSON.stringify(data);
      }

      // Execute fetch request
      const response = await fetch(endpoint, requestOptions);
      setStatus(response.status);

      // Handle response based on status
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Parse response data
      const responseData = await response.json();
      setData(responseData);
      setSuccess(true);
      retryCountRef.current = 0; // Reset retry count on success
    } catch (err) {
      // Don't set error if the request was aborted
      if ((err as Error).name === 'AbortError') {
        return;
      }

      // Handle retry logic
      if (retryCountRef.current < retryCount) {
        retryCountRef.current += 1;
        setTimeout(() => {
          executeRequest();
        }, retryDelay * retryCountRef.current);
        return;
      }

      setError(err as Error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Execute the request when the component mounts
  useEffect(() => {
    executeRequest();

    // Cleanup function to abort any in-flight requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Function to cancel the current request
  const cancel = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
    }
  };

  // Function to manually refetch data
  const refetch = async (): Promise<void> => {
    retryCountRef.current = 0; // Reset retry count
    await executeRequest();
  };

  return {
    data,
    error,
    loading,
    success,
    status,
    cancel,
    refetch,
  };
}

/**
 * Standalone function for making one-off API requests
 */
export async function apiRequest<T = any>(
  config: ApiRequestConfig
): Promise<{ data: T | null; error: Error | null; status: number | null }> {
  const {
    endpoint,
    method = 'GET',
    data,
    headers = {},
    token,
    retryCount = 3,
    retryDelay = 1000,
  } = config;

  let currentRetry = 0;
  let lastError: Error | null = null;
  let responseStatus: number | null = null;

  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add authorization token if provided
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // Add body for non-GET requests
  if (method !== 'GET' && data) {
    requestOptions.body = JSON.stringify(data);
  }

  // Retry loop
  while (currentRetry <= retryCount) {
    try {
      const response = await fetch(endpoint, requestOptions);
      responseStatus = response.status;

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      return { data: responseData, error: null, status: responseStatus };
    } catch (err) {
      lastError = err as Error;
      currentRetry += 1;

      if (currentRetry <= retryCount) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay * currentRetry));
      }
    }
  }

  return { data: null, error: lastError, status: responseStatus };
}