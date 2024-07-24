import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/prisma/prismaClient";

export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method !== "GET") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 },
        );
    }

    try {
        const works = await prisma.work_Experience.findMany();

        const transformedWorks = works.map((work) => ({
            id: work.id,
            title: {
                pt: work.title_pt,
                en: work.title_en,
            },
            description: {
                en: work.description_en,
                pt: work.description_pt,
            },
            technologies: work.technologies.split(","),
            imageUrl: work.imageUrl,
            startDate: work.start_date.toISOString().split("T")[0],
            endDate: work.end_date
                ? work.end_date.toISOString().split("T")[0]
                : null,
        }));

        return NextResponse.json(transformedWorks);
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
        const {
            title_pt,
            title_en,
            company,
            description_pt,
            description_en,
            technologies,
            imageUrl,
            start_date,
            end_date,
        } = await req.json();

        const fields = {
            title_pt,
            title_en,
            company,
            start_date,
            end_date,
            description_pt,
            description_en,
            technologies,
            imageUrl,
        };

        const missingFields = Object.entries(fields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    message: `The following fields are required: ${missingFields.join(", ")}`,
                },
                { status: 400 },
            );
        }

        const newWorkExperience = await prisma.work_Experience.create({
            data: {
                title_pt,
                title_en,
                company,
                description_pt,
                description_en,
                technologies: technologies ? technologies.join(",") : "",
                imageUrl,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
            },
        });

        return NextResponse.json(newWorkExperience, { status: 201 });
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
        const {
            id,
            title_pt,
            title_en,
            company,
            description_pt,
            description_en,
            technologies,
            imageUrl,
            start_date,
            end_date,
        } = await req.json();

        if (!id || !title_pt || !title_en || !company || !start_date) {
            return NextResponse.json(
                { message: "Required fields missing" },
                { status: 400 },
            );
        }

        const updatedWorkExperience = await prisma.work_Experience.update({
            where: { id },
            data: {
                title_pt,
                title_en,
                company,
                description_pt,
                description_en,
                technologies: technologies ? technologies.join(",") : "",
                imageUrl,
                start_date: new Date(start_date),
                end_date: end_date ? new Date(end_date) : null,
            },
        });

        return NextResponse.json(updatedWorkExperience);
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

        await prisma.work_Experience.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Work experience deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}
