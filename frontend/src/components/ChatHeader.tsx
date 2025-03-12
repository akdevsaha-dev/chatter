
import { useChatStore } from "@/store/useChatStore"

export const ChatHeader = () => {
    const {selectedUser} = useChatStore()
    return <div className="h-[8vh] flex bg-slate-900">
       <div className=" w-[8%] flex items-center justify-center">
        <img src={selectedUser?.profilePic || "avatar.svg"} alt="Image" className="w-12 h-12 rounded-full"/>
       </div>
       <div className="w-[92%] ">
        <div className="pt-3 text-md leading-none">
           {selectedUser?.fullName}
        </div>
        <div className="text-sm font-light mt-[2px]">
         online
        </div>
       </div>
    </div>
}\