import {
    PrismaClient,
    Work_Experience as PrismaWorkExperience,
} from "@prisma/client";
import { WorkExperience } from "../models/workExperience";
import { Repository } from "./interfaces/Repository.interface";

const prisma = new PrismaClient();

export class WorkExperienceRepository implements Repository<WorkExperience> {
    async create(
        workExperienceData: Omit<WorkExperience, "id">,
    ): Promise<WorkExperience> {
        const workExperience = await prisma.work_Experience.create({
            data: {
                order: workExperienceData.order,
                title_pt: workExperienceData.title_pt,
                title_en: workExperienceData.title_en,
                company: workExperienceData.company,
                description_pt: workExperienceData.description_pt,
                description_en: workExperienceData.description_en,
                technologies: workExperienceData.technologies,
                imageUrl: workExperienceData.imageUrl,
                start_date: workExperienceData.start_date,
                end_date: workExperienceData.end_date || null,
            },
        });

        return new WorkExperience(
            workExperience.id,
            workExperience.order,
            workExperience.title_pt,
            workExperience.title_en,
            workExperience.company,
            workExperience.description_pt,
            workExperience.description_en,
            workExperience.technologies,
            workExperience.imageUrl,
            workExperience.start_date,
            workExperience.end_date,
        );
    }
    async getAll(): Promise<Array<WorkExperience>> {
        const workExperienceFromDb = await prisma.work_Experience.findMany();

        const workExperiences = workExperienceFromDb.map(
            (workExperience) =>
                new WorkExperience(
                    workExperience.id,
                    workExperience.order,
                    workExperience.title_pt,
                    workExperience.title_en,
                    workExperience.company,
                    workExperience.description_pt,
                    workExperience.description_en,
                    workExperience.technologies,
                    workExperience.imageUrl,
                    workExperience.start_date,
                    workExperience.end_date,
                ),
        );

        return workExperiences;
    }
    async getById(id: string): Promise<WorkExperience | null> {
        const workExperienceFromDb = await prisma.work_Experience.findUnique({
            where: { id },
        });

        if (!workExperienceFromDb) return null;

        return new WorkExperience(
            workExperienceFromDb.id,
            workExperienceFromDb.order,
            workExperienceFromDb.title_pt,
            workExperienceFromDb.title_en,
            workExperienceFromDb.company,
            workExperienceFromDb.description_pt,
            workExperienceFromDb.description_en,
            workExperienceFromDb.technologies,
            workExperienceFromDb.imageUrl,
            workExperienceFromDb.start_date,
            workExperienceFromDb.end_date,
        );
    }
    async update(
        id: string,
        data: Partial<Omit<WorkExperience, "id">>,
    ): Promise<WorkExperience | null> {
        const workExperienceFromDb = await prisma.work_Experience.update({
            where: { id },
            data: data,
        });
        if (!workExperienceFromDb) return null;

        return new WorkExperience(
            workExperienceFromDb.id,
            workExperienceFromDb.order,
            workExperienceFromDb.title_pt,
            workExperienceFromDb.title_en,
            workExperienceFromDb.company,
            workExperienceFromDb.description_pt,
            workExperienceFromDb.description_en,
            workExperienceFromDb.technologies,
            workExperienceFromDb.imageUrl,
            workExperienceFromDb.start_date,
            workExperienceFromDb.end_date,
        );
    }
    async delete(id: string): Promise<WorkExperience | null> {
        const workExperienceFromDb = await prisma.work_Experience.delete({
            where: { id },
        });

        if (!workExperienceFromDb) return null;

        return new WorkExperience(
            workExperienceFromDb.id,
            workExperienceFromDb.order,
            workExperienceFromDb.title_pt,
            workExperienceFromDb.title_en,
            workExperienceFromDb.company,
            workExperienceFromDb.description_pt,
            workExperienceFromDb.description_en,
            workExperienceFromDb.technologies,
            workExperienceFromDb.imageUrl,
            workExperienceFromDb.start_date,
            workExperienceFromDb.end_date,
        );
    }
}
