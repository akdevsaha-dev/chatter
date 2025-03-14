import { useChatStore } from "@/store/useChatStore";
import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { sendMessages } = useChatStore();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const file = e.target.files?.[0];
        if(!file?.type.startsWith("image/")){
            toast.error("Please select an image file")
            return;
        }  
        const reader = new FileReader();
        reader.onloadend = () =>{
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    };
    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()  
        //if no message or image just return
        if(!text.trim() && !imagePreview) return;
        try{ 
            await sendMessages({
                text: text.trim(),
                image: imagePreview
            })
            //clear form
            setText("")
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = "";
        }catch(error){
          console.error("Failed to send message:", error)
        }
    };
    return (
      <div className="p-4 w-[64vw] fixed z-10 bottom-0 flex flex-col gap-2">
      {imagePreview && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview as string}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* FLEX WRAPPER TO PREVENT SHIFTING */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            className="w-full ring-1 h-10 p-4 input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
    );
};
