import {authServer} from "@/lib/auth/server";
import {redirect} from "next/navigation";

export async function getCurrentUser() {
    const { data } = await authServer.getSession();
    const user = data?.user;
    if( !user){
        redirect("auth/sign-in")
    }

    return {
        user,
    };
}