import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method !== "GET") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 500 },
        );
    }

    try {
        const data = [
            "NextJS",
            "ReactJs",
            "VueJS",
            "NodeJS",
            "Typescript",
            "Python",
            "FastAPI",
            "Javascript",
            "Git",
            "Github",
            "MySQL",
            "PostgreSQL",
            "Docker",
        ];

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}
