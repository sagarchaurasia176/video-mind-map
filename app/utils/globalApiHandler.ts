import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * Helper function to create a success API response
 */
export function createSuccessResponse<T>(
  data: T,
  message: string = "Success"
): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return NextResponse.json(response, { status: 200 });
}

/**
 * Helper function to create an error API response
 */
export function createErrorResponse(
  message: string,
  error?: string,
  status: number = 500
): NextResponse {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return NextResponse.json(response, { status });
}