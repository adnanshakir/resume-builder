import { verifyToken } from "./jwt";
import { cookies } from "next/headers";

export async function getCurrentUser(){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if(!token) throw new Error("No token found");

        const decode = verifyToken(token);
        if(!decode) throw new Error("Unauthorized");

        return decode.userId;

    }catch(err){
        console.log("Error while getting current user",err);
    }
}