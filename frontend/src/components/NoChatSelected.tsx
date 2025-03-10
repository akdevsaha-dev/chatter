import { Send } from "lucide-react";

export const NoChatSelected = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="text-slate-300 text-2xl ">
            <div className="w-full flex justify-center">
            <Send size={30} />
            </div>
            <div className="font-semibold pt-3 text-blue-500 text-center">
            Welcome to Chatter!
            </div>
            <div className="text-base pt-2">
                Select conversation to start chatting.
            </div>
            </div>
        </div>
    );
};
