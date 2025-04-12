// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not for security
    if (!user) {
      return NextResponse.json(
        {
          message:
            "If your email is in our system, you will receive a password reset link shortly.",
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send email with reset link
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    if (process.env.NODE_ENV === "development") {
      console.log(
        "\n💌 EMAIL SENT 💌",
        `\nSubject: Reset your password\nTo: ${user.email}\nPlease use the following link to reset your password:\n${resetUrl}\n`
      );
    }

    return NextResponse.json(
      {
        message:
          "If your email is in our system, you will receive a password reset link shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
