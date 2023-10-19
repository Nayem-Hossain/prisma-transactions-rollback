import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
    return this.toString();
};

// create:
export async function POST(req, res) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.product.create({
            data: {
                firstName: "One plus",
                metaTitle: "earpod",
                slug: "dynamic earpod",
                summary: "this product is very comfortable",
                price: 1200,
                discount: 25,
                userId: 1,
            }
        })
        return NextResponse.json({ status: "product data created successfully", data: result });
    } catch (error) {
        return NextResponse.json({ status: "failed to create product data", data: error.toString() });
    }

}

// Read:
export async function GET(req, res) {
    try {
        const prisma = new PrismaClient()
        const result = await prisma.product.findMany()
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
        const result = await prisma.product.update({
            where: {
                id: 1,
            },
            data: {
                price: 1400,
                discount: 20,
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
        const result = await prisma.product.delete({
            where: {
                id: 2,
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
        const aggregations = await prisma.product.aggregate({
            _avg: { discount: true },
            _count: { discount: true },
            _max: { price: true },
            _min: { price: true },
            _sum: { price: true },

        })

        // Aggregate (groupBy)
        const result = await prisma.product.groupBy({
            by: ["discount"],
            _count: { price: true },
            having: { discount: 20 },
        })
        return NextResponse.json({ status: "data aggregate successfully", data: [aggregations, result] });
    } catch (error) {
        return NextResponse.json({ status: "faild to aggregate data", data: error.toString() });
    }
}