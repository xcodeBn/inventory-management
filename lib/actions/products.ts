'use server'

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function deleteProduct(formData: FormData): Promise<void> {
    const { user } = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }
    const id = formData.get("id");
    if (!id || typeof id !== "string") {
        throw new Error("Invalid product id");
    }
    await prisma.product.deleteMany({
        where: {
            id,
            userId: user.id, // 🔐 ensures ownership
        },
    });
}
