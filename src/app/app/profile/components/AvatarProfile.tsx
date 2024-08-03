
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RefreshCw } from "lucide-react";

const getInitials = (name: string | undefined) => {
    if (!name) return "CN";
    const nameArray = name.split(" ");
    const initials = nameArray.slice(0, 2).map(n => n.charAt(0)).join("");
    return initials.toUpperCase();
};

export function AvatarProfile({ user, handleOpenModalChangePicture }: any) {
    return (
        <div className="relative -mb-14 ">
            <Avatar className="h-36 w-36">
                <AvatarImage src={user?.avatarUrl} className="h-36 w-36" />
                <AvatarFallback className="bg-blue-500"> {getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div
                onClick={handleOpenModalChangePicture}
                className="absolute bottom-0 right-0 m-1 ring-2 rounded-full p-1 bg-zinc-700/70 ring-green-400 dark:ring-white cursor-pointer"
            >
                <RefreshCw className="h-6 w-6 stroke-green-400 dark:stroke-green-500 stroke-2 " />
            </div>
        </div>
    )
}