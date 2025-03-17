import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../lib/axios";
import Toast from "react-native-toast-message";

interface User {
  id: string;
  Email: string;
  Name: string;
  Role: string;
  Username: string;
  Phonenumber: string;
  Image: string;
}

interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  number: string;
  image: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useUserStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  register: async (data: RegisterData) => {
    set({ loading: true });
    if (data.password !== data.confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      set({ loading: false });
      return;
    }

    try {
      const response = await axios.post("/Users/register", data);
      if (response.data.success) {
        set({ user: response.data.User, loading: false });
        await AsyncStorage.setItem("user", JSON.stringify(response.data.User));
        Toast.show({ type: "success", text1: response.data.message });
      } else {
        Toast.show({ type: "error", text1: response.data.message });
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Registration failed. Try again." });
    }
    set({ loading: false });
  },

  login: async (data: LoginData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/Users/login", data, { withCredentials: true });

      if (response.data.success) {
        set({ user: response.data.User, loading: false });
        await AsyncStorage.setItem("user", JSON.stringify(response.data.User));
        Toast.show({ type: "success", text1: response.data.message });
      } else {
        Toast.show({ type: "error", text1: response.data.message });
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Invalid credentials" });
    }
    set({ loading: false });
  },

  logout: async () => {
    try {
      await axios.post("/Users/logout");
      await AsyncStorage.removeItem("user");
      set({ user: null });
      Toast.show({ type: "success", text1: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Logout failed. Try again." });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        set({ user: JSON.parse(storedUser), checkingAuth: false });
      } else {
        const response = await axios.get("Profile/getProfile", { withCredentials: true });
        set({ user: response.data, checkingAuth: false });
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error);
      set({ user: null, checkingAuth: false });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axios.post("/Users/refresh-token");
      if (response.data.success) {
        set({ checkingAuth: false });
        return response.data;
      }
    } catch (error) {
      set({ user: null, checkingAuth: false });
      console.error("Token refresh failed:", error);
    }
  },
}));

let refreshPromise: Promise<void> | null = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
