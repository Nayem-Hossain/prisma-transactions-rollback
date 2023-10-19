import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
    return this.toString();
};

// create:
export async function POST(req, res) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.order.create({
            data: {
                title: "One Plus",
                token: "xyz-abc",
                subTotal: 2000,
                itemDiscount: 200,
                tax: 20,
                total: 5640,
                discount: 340,
                grandTotal: 6800,
                firstName: "Mr",
                middleName: "Anis",
                lastName: "Ahamed",
                mobile: "01677863720",
                email: "anisahamed@gmail.com",
                city: "Dhaka",
                country: "Bangladesh",
                userId: 1,
            }
        })
        return NextResponse.json({ status: "order data created successfully", data: result });
    } catch (error) {
        return NextResponse.json({ status: "failed to create order data", data: error.toString() });
    }

}

// Read:
export async function GET(req, res) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.order.findMany()
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
        const result = await prisma.order.update({
            where: {
                id: 2,
            },
            data: {
                grandTotal: 7800,
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
        const result = await prisma.order.delete({
            where: {
                id: 1,
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
        const aggregations = await prisma.order.aggregate({
            _avg: { discount: true },
            _count: { discount: true },
            _max: { tax: true },
            _min: { tax: true },
            _sum: { discount: true },

        })

        // Aggregate (groupBy)
        const grouping = await prisma.order.groupBy({
            by: ["discount"],
            _count: { id: true },
        })

        return NextResponse.json({ status: "data aggregate successfully", data: [aggregations, grouping] });
    } catch (error) {
        return NextResponse.json({ status: "faild to aggregate data", data: error.toString() });
    }
}