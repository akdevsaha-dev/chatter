import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface User {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string
  }
  
interface Message {
    senderId: string;
    receiverId: string;
    text?: string;
    image?: string;
    createdAt: string;
  }

interface ChatStore {
    selectedUser : User | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    users: User[],
    messages: Message[],
    setSelectedUser: (selectedUser: User | null) => void;
    getUsers: () => Promise<void>;
    getMessages: (userID: string) => Promise<void>;
  }

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        set({ isUsersLoading: true });
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

    //we need to optimize this later
    setSelectedUser:(selectedUser ) => set({selectedUser})
}));

