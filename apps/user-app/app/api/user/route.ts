import { NextResponse } from "next/server";
import db from "@repo/db/client";

export const GET = async () => {
  try {
    await db.user.create({
      data: {
        email: "abc@gmail.com",
        number: "123456789",
        password: "87654321",
      },
    });
    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
};
