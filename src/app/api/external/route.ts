import { NextResponse } from "next/server";

const apiURL: string = "https://jsonplaceholder.typicode.com/posts";

export async function GET() {
  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch data from the external API",
          success: false,
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("API Error:", error);

    // Ensure error is of type Error before accessing properties
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching data",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
