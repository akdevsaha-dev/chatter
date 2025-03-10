import { Image, Send } from "lucide-react"
import { useState } from "react"

export const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null)
    
    return <div className="w-full h-[12%] flex items-center">
      <input type="text" className="w-[90%] h-[6vh] ring-1 ring-slate-600 rounded-lg pl-3" />
      <div className="flex flex-row gap-4">
      <Image className="ml-3 text-cyan-400"/>
      <Send className="text-cyan-400"/>
      </div>
    </div>
}