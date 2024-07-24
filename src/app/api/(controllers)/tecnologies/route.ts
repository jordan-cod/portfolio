import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/prisma/prismaClient";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 },
        );
    }

    try {
        const technologies = await prisma.technologies.findMany();
        const technologyNames = technologies.map((tech) => ({
            id: tech.id,
            name: tech.name,
            favorite: tech.favorite,
            order: tech.order,
        }));

        return NextResponse.json(technologyNames);
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 },
        );
    }

    try {
        const { name, favorite, order } = await req.json();

        if (!name) {
            return NextResponse.json(
                { message: "Name is required" },
                { status: 400 },
            );
        }

        const newTechnology = await prisma.technologies.create({
            data: {
                name,
                favorite: favorite || false,
                order: order || 0,
            },
        });

        return NextResponse.json(newTechnology, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}

export async function PUT(req: NextRequest) {
    if (req.method !== "PUT") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 },
        );
    }

    try {
        const { id, name, favorite, order } = await req.json();

        if (!id || !name) {
            return NextResponse.json(
                { message: "ID and Name are required" },
                { status: 400 },
            );
        }

        const updatedTechnology = await prisma.technologies.update({
            where: { id },
            data: {
                name,
                favorite: favorite || false,
                order: order || 0,
            },
        });

        return NextResponse.json(updatedTechnology);
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}

export async function DELETE(req: NextRequest) {
    if (req.method !== "DELETE") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 },
        );
    }

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { message: "ID is required" },
                { status: 400 },
            );
        }

        await prisma.technologies.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Technology deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}
