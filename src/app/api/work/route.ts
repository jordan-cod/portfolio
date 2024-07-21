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
            {
                imageSrc: "/teste.png",
                title: "Frontend Developer",
                company: "Abrasel",
                period: "Apr 2024 - Present",
                details:
                    "Responsible for developing and maintaining the company's frontend applications using React and Next.js. Worked closely with designers to create a user-friendly interface.",
            },
            {
                imageSrc: "/teste.png",
                title: "Backend Developer",
                company: "Tech Corp",
                period: "Jan 2023 - Mar 2024",
                details:
                    "Developed and maintained backend services using Node.js and Express. Implemented RESTful APIs and worked with databases such as MongoDB and PostgreSQL.",
            },
            {
                imageSrc: "/teste.png",
                title: "Full Stack Developer",
                company: "Web Solutions",
                period: "Jun 2021 - Dec 2022",
                details:
                    "Worked on full-stack development projects using MERN stack (MongoDB, Express, React, Node.js). Led several projects from conception to deployment.",
            },
        ];

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}
