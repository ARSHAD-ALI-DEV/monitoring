import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";

export const useShotStore = create((set, get) => ({
    shots: [],
    myShots: [],
    users: [],
    selectedUser: null,
    medieStream: null, // ✅ Global media stream

    startCapturing: async () => {
        if (get().medieStream) return; // ✅ पहले से स्ट्रीम है तो कुछ मत करो

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            set({ medieStream: stream });
        } catch (error) {
            console.log("Screen sharing failed:", error);
        }
    },

    stopCapturing: () => {
        const stream = get().medieStream;
        if (stream) {
            stream.getTracks().forEach(track => track.stop()); // स्ट्रीम बंद करें
            set({ medieStream: null });
        }
    },

    sendShot: async (blob) => {
        try {
            const res = await axiosInstance.post("/screen/send-shot", blob, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    },

    getUsers: async (navigate) => {
        try {
            const res = await axiosInstance.get("/screen/users");
            console.log(res);
            set({ users: res.data.users });
        } catch (error) {
            console.log(error);
        }
    },

    userActivity: async () => {
        try {
            const {selectedUser} = get()
            console.log(selectedUser)
            const res = await axiosInstance.get(`/screen/activity/${selectedUser?._id}`);
            console.log(res);
            set({ shots: res.data.screenshots });
        } catch (error) {
            console.log(error);
        }
    },

    myActivity: async () => {
        try {
            const res = await axiosInstance.get("/screen/activity");
            console.log(res);
            set({ myShots: res.data.myShots });
        } catch (error) {
            console.log(error);
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    }
}));
