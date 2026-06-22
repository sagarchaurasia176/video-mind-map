import { NextResponse } from "next/server";

export const handleApiError = (error:unknown,status:any)=>{
    return {
        success:false,
        message:error instanceof Error ? error.message : "Internal server Error"
    }
}
