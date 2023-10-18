import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export async function POST(req, res) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.user.create({
            data: {
                firstName: "Mr",
                middleName: "Anis",
                lastName: "Ahamed",
                mobile: "01677863720",
                email: "anisahamed@gmail.com",
                password: "123-xyz",
                admin: false
            }
        })
        return NextResponse.json({ status: "user data created successfully", data: result });
    } catch (error) {
        return NextResponse.json({ status: "failed to create user data", data: error.toString() });
    }

}