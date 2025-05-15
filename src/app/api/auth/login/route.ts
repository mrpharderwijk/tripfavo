import { prisma } from "@/lib/prisma/db";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error:", error)

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}