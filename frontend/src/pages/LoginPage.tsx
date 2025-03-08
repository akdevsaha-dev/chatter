import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };
  const handleSubmit = () => {
    const success = validateForm()
    if(success === true) login(formData)
  };

  return (
    <div className="h-screen w-full grid grid-cols-8">
      {/* left side */}
      <div className="col-span-4 bg-black flex justify-center items-center">
        <div className="h-[70%] w-[60%] rounded-lg text-white pl-3">
          <div className="text-3xl font-semibold font-sans  pt-10">
            Create your account
          </div>
          <div className="text-md font-thin font-sans pt-2 text-gray-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-500 hover:text-indigo-400 "
            >
              Sign up
            </a>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-10 ">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-6">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 pt-8">
            <button
              type="submit"
              className="h-10 w-full min-w-0 bg-indigo-800 hover:bg-indigo-700 text-white font-thin  py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Loading...
                </>
              ) : (
                "Login"
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
  );
};
