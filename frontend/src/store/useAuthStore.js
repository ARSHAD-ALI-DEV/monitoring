import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    isLoggingIn: false,
    isSigningUp: false,
    authUser: null,
    isVerifying: false,
    isVerifyingOtp: false,

    login: async (data, navigate) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("/auth/login", data);
            console.log(res);
            set({ authUser: res.data.user });
            const {authUser} = get()
            console.log(authUser)
            if(res.data.user.isVerified === false){
                navigate("/sign-up")
            }
            if(res.data.status == 201){
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    signup: async (data, navigate) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // Correct content type for multipart data
                },
            });
            console.log(res);
            set({ authUser: res.data.user });
            if(res.data.status == 201 || res.data.status == 301){
                navigate("/verify")
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.get("/auth/logout");
            console.log(res);
            set({ authUser: null });
            const {authUser} = get()
            console.log(authUser)
        } catch (error) {
            console.log(error);
        }
    },

    verification: async (otp, navigate) => {
        try {
            set({ isVerifyingOtp: true });
            const res = await axiosInstance.post("/auth/verify", otp);
            console.log(res);
            if(res.data.status == 200){
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({ isVerifyingOtp: false });
        }
    },

    getMe: async() => {
        try {
            set({isVerifying: true})
            const res = await axiosInstance.get("/auth/me")
            set({authUser: res.data.user})
        } catch (error) {
            console.log(error)
        }finally{
            set({isVerifying: false})
        }
    }
}))
