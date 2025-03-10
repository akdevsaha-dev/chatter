import { ChatComp } from "@/components/ChatComp";
import { NoChatSelected } from "@/components/NoChatSelected"
import { SideBar } from "@/components/SideBar"
import { useChatStore } from "@/store/useChatStore"

export const ChatsPage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className="text-white h-screen bg-black flex justify-center items-center ">
      <div className="w-[80%] h-[88%] mt-[10vh] bg-gray-800 flex border-[1px] border-gray-800 rounded-sm">
        <div className="w-[20%] bg-[#000000]">
        <SideBar/>
        </div>
        <div className="w-[80%] h-full bg-[#070a00]">
          {!selectedUser? <NoChatSelected/> : <ChatComp/>}
        </div>
      </div>
      </div>
  )
}
