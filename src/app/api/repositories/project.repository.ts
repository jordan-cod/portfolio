import { PrismaClient, Project as PrismaProject } from "@prisma/client";
import { Project } from "../models/project";
import { Repository } from "./interfaces/Repository.interface";

const prisma = new PrismaClient();

export class ProjectRepository implements Repository<Project> {
    async create(projectData: Omit<Project, "id">): Promise<Project> {
        const project = await prisma.project.create({
            data: projectData,
        });

        return new Project(
            project.id,
            project.order,
            project.title,
            project.description_pt,
            project.description_en,
            project.technologies,
            project.imageUrl,
            project.repoUrl,
            project.liveUrl,
            project.favorite,
            project.date,
        );
    }
    async getAll(): Promise<Array<Project>> {
        const projectsFromDb = await prisma.project.findMany();

        const projects = projectsFromDb.map(
            (project) =>
                new Project(
                    project.id,
                    project.order,
                    project.title,
                    project.description_pt,
                    project.description_en,
                    project.technologies,
                    project.imageUrl,
                    project.repoUrl,
                    project.liveUrl,
                    project.favorite,
                    project.date,
                ),
        );

        return projects;
    }
    async getById(id: string): Promise<Project | null> {
        const projectFromDb = await prisma.project.findUnique({
            where: { id },
        });

        if (!projectFromDb) return null;

        return new Project(
            projectFromDb.id,
            projectFromDb.order,
            projectFromDb.title,
            projectFromDb.description_pt,
            projectFromDb.description_en,
            projectFromDb.technologies,
            projectFromDb.imageUrl,
            projectFromDb.repoUrl,
            projectFromDb.liveUrl,
            projectFromDb.favorite,
            projectFromDb.date,
        );
    }
    async update(
        id: string,
        projectData: Partial<Omit<Project, "id">>,
    ): Promise<Project | null> {
        const project = await prisma.project.update({
            where: { id },
            data: projectData,
        });
        if (!project) return null;

        return new Project(
            project.id,
            project.order,
            project.title,
            project.description_pt,
            project.description_en,
            project.technologies,
            project.imageUrl,
            project.repoUrl,
            project.liveUrl,
            project.favorite,
            project.date,
        );
    }
    async delete(id: string): Promise<Project | null> {
        const projectFromDb = await prisma.project.delete({
            where: { id },
        });

        if (!projectFromDb) return null;

        return new Project(
            projectFromDb.id,
            projectFromDb.order,
            projectFromDb.title,
            projectFromDb.description_pt,
            projectFromDb.description_en,
            projectFromDb.technologies,
            projectFromDb.imageUrl,
            projectFromDb.repoUrl,
            projectFromDb.liveUrl,
            projectFromDb.favorite,
            projectFromDb.date,
        );
    }
}
