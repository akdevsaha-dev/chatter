import { useAuthStore } from "@/store/useAuthStore"
import { LogOut, Settings, UserPen } from "lucide-react";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  return (
    <div className="bg-black h-[10vh] w-full px-5 text-white flex fixed z-1">
      <div className="w-[40%] font-semibold text-xl font-mono flex items-center pl-[10%]">
        CHATTER
      </div>
      <div className="w-[60%] flex  items-center justify-end gap-8 text-white pr-10">
        <Link to={"/settings"} className="flex gap-2 items-center">
        <Settings size={15} />
         Settings
        </Link>
        {authUser && (
          <>
          <Link to={"/profile"}>
          <div className="flex gap-2 items-center">
          <UserPen size={15} />
            Profile
          </div>
          </Link>
          <button className="flex gap-2 items-center hover:cursor-pointer " onClick={logout}>
          <LogOut size={15} />
            <span>
              Logout
            </span>
          </button>
          </>
        )
        }
      </div>
    </div>
  )
}
