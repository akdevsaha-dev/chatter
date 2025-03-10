
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";

interface AuthStore {
  authUser: { id: string; fullName: string; email: string; createdAt: Date } | null;
  checkAuth: () => void;
  isCheckingAuth: boolean
  isSigningUp : boolean
  isLoggingIn: boolean
  signup: (data: { fullName: string; email: string; password: string }) => void
  login : (data: {email: string;
    password: string}) => void
    isUpdatingProfile: boolean
}


export const useAuthStore = create<AuthStore>((set) => ({

  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, //as soon as we refresh our page we will start to check if the user is authenticated or not.

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({ authUser: res.data })
    } catch (error) {
      console.log(error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data: { fullName: string; email: string; password: string }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      // get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error("Failed creating account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: {
    email: string,
    password: string
  }) => {
     set({isLoggingIn: true})
     try{
      const res = await axiosInstance.post("/auth/signin", data)
      set({authUser: res.data})
      toast.success("Logged in successfully!")
     }catch(error){
        console.log(error)
        toast.error("Failed to login")
     }finally{
        set({isLoggingIn: false})
     }
  },

  logout: async() => {
    try{
      await axiosInstance.post("/auth/logout")
      set({authUser: null})
      toast.success("Logged out successfully!")
    } catch(error){
      toast.error((error as Error).message)
    }
  }

}))