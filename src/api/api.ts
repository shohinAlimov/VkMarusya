import axios from "axios";

let onUnauthorized: (() => void) | null = null;
export const setOnUnauthorized = (cb: () => void) => (onUnauthorized = cb);

// Detect if running on mobile
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Enhanced logging for debugging
const logRequest = (config: any) => {
  console.log("API Request:", {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    withCredentials: config.withCredentials,
    userAgent: navigator.userAgent,
    isMobile,
    origin: window.location.origin,
  });
  return config;
};

const logResponse = (response: any) => {
  console.log("API Response:", {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    url: response.config.url,
  });
  return response;
};

const logError = (error: any) => {
  console.error("API Error:", {
    message: error.message,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    headers: error.response?.headers,
    url: error.config?.url,
    withCredentials: error.config?.withCredentials,
  });

  // Specific mobile debugging
  if (isMobile) {
    console.error("Mobile-specific error details:", {
      cookiesEnabled: navigator.cookieEnabled,
      storage: typeof Storage !== "undefined",
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
    });
  }

  return error;
};

export const api = axios.create({
  baseURL: "https://cinemaguide.skillbox.cc/",
  withCredentials: true,
  timeout: 10000, // Add timeout
  headers: {
    "Content-Type": "application/json",
    // Add user agent for better debugging
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add request interceptor for logging
api.interceptors.request.use(logRequest, (error) => {
  console.error("Request interceptor error:", error);
  return Promise.reject(error);
});

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    logResponse(response);
    return response;
  },
  (error) => {
    logError(error);

    if (error.response?.status === 401) {
      console.warn("Unauthorized access detected");
      onUnauthorized?.();
    }

    // Handle network errors specifically on mobile
    if (!error.response && isMobile) {
      console.error(
        "Network error on mobile - possible CORS or connectivity issue"
      );
    }

    return Promise.reject(error);
  }
);

// Test function to check API connectivity
export const testApiConnection = async () => {
  try {
    console.log("Testing API connection...");
    const response = await axios.get("https://cinemaguide.skillbox.cc/", {
      withCredentials: false, // Test without credentials first
      timeout: 5000,
    });
    console.log("API test successful:", response.status);
    return true;
  } catch (error) {
    console.error("API test failed:", error);
    return false;
  }
};

// Alternative API instance without credentials for testing
export const apiWithoutCredentials = axios.create({
  baseURL: "https://cinemaguide.skillbox.cc/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
