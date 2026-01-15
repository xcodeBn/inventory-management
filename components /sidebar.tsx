'use client';

import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@neondatabase/auth/react";

export default function SideBar() {
    const currentPath = usePathname();
    const navigation = [
        {
            name: "Dashboard", href: "/dashboard", icon: BarChart3,
        },
        {
            name: "Inventory", href: "/inventory", icon: Package,
        },
        {
            name: "Add Product", href: "/add-product", icon: Plus,
        },
        {
            name: "Settings", href: "/settings", icon: Settings,
        },
    ]

    return (
        <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6">
            <div className={"mb-8"}>
                <div className={"flex items-center space-x-2 mb-4"}>
                    <BarChart3 className={"w-7 h-7"} />
                    <span className={"text-lg font-semibold"}>
                        Inventory App
                    </span>
                </div>

                <nav className={"space-y-1"}>
                    <div className={"text-sm font-semibold text-gray-400 uppercase"}>
                        Inventory
                    </div>
                    {
                        navigation.map((item, key) => {
                            const IconComponent = item.icon;
                            const isActive: boolean = currentPath === item.href;
                            return (
                                <Link href={item.href} key={key}
                                    className={`flex items-center space-x-3 py-2 px-3 rounded-lg 
                                      ${isActive ? "bg-purple-100 text-gray-800" : "text-gray-300 hover:bg-gray-800"} `} >
                                    <IconComponent className={"w-5 h-5"} />
                                    <span className={"text-sm"}>
                                        {item.name}
                                    </span>
                                </Link>
                            )
                        })
                    }
                </nav>
                <div className={"absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700 overflow-hidden"}>
                    <div className={"flex items-center  mb-4 justify-between"}>
                        <UserButton className="max-w-full overflow-hidden" />
                    </div>
                </div>
            </div>
        </div>
    )
}