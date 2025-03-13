import { useChatStore } from "@/store/useChatStore"
import { useEffect } from "react"
import { ChatHeader } from "./ChatHeader"
import { MessageInput } from "./MessageInput"

export const ChatComp = () => {

    const { getMessages , selectedUser, isMessagesLoading, } = useChatStore()
   
    useEffect(()=> {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser, selectedUser?._id, getMessages])

    if(isMessagesLoading) return <div className="h-screen lex items-center justify-center">Loading...</div>
    return <div className="h-full w-full">
      <ChatHeader/>
      <div className="h-[80vh] w-full absolute z-0">
        yoo
      </div>
      <MessageInput/>
    </div>
}