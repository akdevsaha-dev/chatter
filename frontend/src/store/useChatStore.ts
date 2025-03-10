import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userID: string) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userID}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
}));
