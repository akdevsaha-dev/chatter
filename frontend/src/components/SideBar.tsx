import { useChatStore } from "@/store/useChatStore"
import {  Users } from "lucide-react"
import { useEffect, useState } from "react"
import SidebarSkeleton from "./skeleton/SidebarSkeleton"
import { useAuthStore } from "@/store/useAuthStore"

export const SideBar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers()
    }, [getUsers])


    const filteredUsers = users;

    if (isUsersLoading) return <SidebarSkeleton />

    return <div className="text-white flecx flex-col">
        <div className="border-b-[1px] border-slate-600 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className="size-6" />
                <span className="font-medium hidden lg:block">Contacts</span>
            </div>
            {/* TODO: Online filter toggle */}
            <div className="mt-3 hidden lg:flex items-center gap-2">
                <label className="cursor-pointer flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                        className="checkbox checkbox-sm"
                    />
                    <span className="text-sm">Show online only</span>
                </label>
                <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
            </div>
        </div>

        <div className="overflow-y-auto w-full py-2">
            {filteredUsers.map((user) => (
                <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`
              w-full p-3 flex items-center gap-3
              hover:bg-[#131322] text-gray-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-[#171b2a]" : ""}
            `}
                >
                    <div className="relative mx-auto lg:mx-0">
                        <img
                            src={user.profilePic || "/avatar.svg"}
                            alt={user.fullName}
                            className="size-10 object-cover rounded-full"
                        />
                        {onlineUsers.includes(user._id) && (
                            <span
                                className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                            />
                        )}
                    </div>

                    {/* User info - only visible on larger screens */}
                    <div className="hidden lg:block text-left min-w-0">
                        <div className="font-medium truncate">{user.fullName}</div>
                        <div className="text-sm text-zinc-400">
                            {/* {onlineUsers.includes(user._id) ? "Online" : "Offline"} */}
                        </div>
                    </div>
                </button>
            ))}

            {filteredUsers.length === 0 && (
                <div className="text-center text-zinc-500 py-4">No online users</div>
            )}
        </div>
    </div>
}