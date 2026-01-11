import {AppleIcon} from "lucide-react";


export default function SideBar({currentPath = "/dashboard"}:{
    currentPath: string;
}) {


    return (
        <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6">
            <div className={"mb-8"}>
                <div className={"flex items-center space-x-2 mb-4"}>
                    <AppleIcon/>
                </div>
            </div>
        </div>
    )
}