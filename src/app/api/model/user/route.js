import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
    return this.toString();
};

// create:
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

// Read:
export async function GET(req, res) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.user.findMany()
        // console.log(result)
        return NextResponse.json({ status: "data find successfully", data: result });
    } catch (error) {
        return NextResponse.json({ status: "faild to find data", error: error });
    }
}

// Update:
export async function PUT(req, res) {
    try {

        const prisma = new PrismaClient()
        const result = await prisma.user.update({
            where: {
                id: 1,
            },
            data: {
                firstName: "Mr",
                middleName: "Faisal",
                lastName: "Hossain",
                email: "faisal2@gmail.com",
                admin: true
            }
        })
        console.log(result)
        return NextResponse.json({ status: "data updated successfully", data: result });
    } catch (error) {
        return NextResponse.json({ status: "faild to update data", data: error });
    }
}

// Delete:
export async function DELETE(req, res) {
    try {

        const prisma = new PrismaClient()
        const result = await prisma.user.delete({
            where: {
                id: 2,
            },
            select: {
                email: true,
                mobile: true,
            },
        })
        console.log(result)
        return NextResponse.json({ status: "data deleted successfully", data: result });
    } catch (error) {
        return NextResponse.json({ status: "faild to delete data", data: error });
    }
}

export async function PATCH(req, res) {
    try {
        const prisma = new PrismaClient()
        // Aggregate(_avg, _count, _max, _min, _sum)
        const aggregations = await prisma.user.aggregate({
            _count: { admin: true },
        })

        // Aggregate (groupBy)
        const grouping = await prisma.user.groupBy({
            by: ["admin"],
            _count: { id: true },
        })


        // Transactions & Rollback
        const createUser = prisma.user.create({
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

        const deleteOrder = prisma.order.delete({
            where: { id: 5 }
        })

        const transactionRollback = await prisma.$transaction([createUser, deleteOrder])

        console.log(transactionRollback)
        return NextResponse.json({ status: "data aggregate and transaction successfully", data: [aggregations, grouping, transactionRollback] });
    } catch (error) {
        return NextResponse.json({ status: "faild to aggregate and transaction data", data: error.toString() });
    }
}