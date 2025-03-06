
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'

interface AuthStore {
  authUser: { id: string; name: string; email: string } | null;
  checkAuth: () => void;
  isCheckingAuth: boolean
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
  }
}))