import SideBar from "@/components/sidebar";
import {AccountSettingsCards} from "@neondatabase/auth/react";

export default function SettingsPage(){
   return <div className={"min-h-screen bg-gray-50 "}>
        <SideBar />
        <main className={"ml-64 p-8"}>
            <div className={"mb-8"}>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <h1 className={"text-2xl font-semibold text-gray-900"}>
                            Settings
                        </h1>
                        <p className={"text-sm text-gray-500"}>
                            Manage your account settings and preferences
                        </p>
                    </div>
                </div>
            </div>
            <div className={"max-w-6xl"}>
                <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
                    <AccountSettingsCards/>
                </div>
            </div>
        </main>
    </div>

}