
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp"
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = () => {

    const success = validateForm();

    if (success === true) signup(formData);
  };
  return (
    <div className="h-[80vh] w-full grid grid-cols-8">
      {/* left side */}
      <div className="col-span-4 bg-black flex justify-center items-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="h-[70%] w-[60%] rounded-lg text-white pl-3">
          <div className="text-3xl font-semibold font-sans  pt-10">
            Create your account
          </div>
          <div className="text-md font-thin font-sans pt-2 text-gray-400">
            Already have an account? <a href="/login" className="text-indigo-500 hover:text-indigo-400 underline">Login</a>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-8">
            <Label htmlFor="userName">Username</Label>
            <Input type="text" id="userName" placeholder="Username" onChange={(e) => {
              setFormData({
                ...formData,
                fullName: e.target.value
              })
            }} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-6">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value
              })
            }} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-6">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value
              })
            }} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-8">
            <button type="submit" className="h-10 w-full min-w-0 bg-indigo-800 hover:bg-indigo-700 text-white font-thin  py-2 px-4 rounded" onClick={handleSubmit} disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin " />
                  Loading...
                </>) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="col-span-4 bg-white">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Chat with people <br /> the right way
          </motion.h1>
        </LampContainer>
      </div>
    </div>
  )
}
