import { prisma } from "@/lib/prisma/db";
import { auth } from "@/lib/auth/auth"
import { SafeUser } from "@/types";

export async function getSession() {
  return await auth();
}
export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() ?? null,
    };
  } catch (error: any) {
    return null;
  }
}