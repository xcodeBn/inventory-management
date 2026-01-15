'use server'

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {z} from "zod";
import {redirect} from "next/navigation";


const ProductSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(500, "Name is too long"),

    sku: z
        .string()
        .trim()
        .max(100, "SKU is too long")
        .optional()
        .or(z.literal("")),

    price: z.coerce
        .number()
        .positive("Price must be greater than 0")
        ,

    quantity: z.coerce
        .number()
        .int("Quantity must be an integer")
        .nonnegative("Quantity cannot be negative"),

    lowStockAt: z
        .union([
            z.coerce.number().int().positive(),
            z.undefined(),
        ])
        .optional(),
});



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

export async function createProduct(formData: FormData): Promise<void> {
    const { user } = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }
    const id = user.id;

    const name = formData.get("name");
    const sku = formData.get("sku");
    const price = formData.get("price");
    const lowStockAt = formData.get("lowStockAt");
    const quantity = formData.get("quantity");

    const parsed = ProductSchema.safeParse({
        name : name,
        sku: sku || undefined,
        price: price,
        lowStockAt: lowStockAt || undefined,
        quantity: quantity
    })
    if(!parsed.success){
        throw new Error("Validation failed");
    }
    try {
        await prisma.product.create({
            data: {
                userId : id,
                ...parsed.data
            }
        })

        redirect("/inventory");
    }
    catch (error) {
        throw new Error(`Failed to create product ${error}`)
    }
}
