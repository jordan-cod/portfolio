import { NextRequest, NextResponse } from "next/server";
import { ProjectRepository } from "../../repositories/project.repository";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 },
        );
    }

    try {
        const projectRepository = new ProjectRepository();
        const projects = await projectRepository.getAll();

        const transformedProjects = projects.map((project) => {
            const formattedDate = project.date.toISOString().split("T")[0];

            return {
                id: project.id,
                title: project.title,
                description: {
                    en: project.description_en,
                    pt: project.description_pt,
                },
                technologies: project.technologies.split(","),
                imageUrl: project.imageUrl,
                repoUrl: project.repoUrl,
                deployUrl: project.liveUrl,
                favorite: project.favorite,
                date: formattedDate,
            };
        });

        return NextResponse.json(transformedProjects);
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 },
        );
    }
}
