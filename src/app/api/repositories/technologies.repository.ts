import {
    PrismaClient,
    Technologies as PrismaTechnologies,
} from "@prisma/client";
import { Technologies } from "../models/technologies";
import { Repository } from "./interfaces/Repository.interface";

const prisma = new PrismaClient();

export class ProjectRepository implements Repository<Technologies> {
    async create(
        technologiesData: Omit<Technologies, "id">,
    ): Promise<Technologies> {
        const technologies = await prisma.technologies.create({
            data: technologiesData,
        });

        return new Technologies(
            technologies.id,
            technologies.order,
            technologies.name,
            technologies.favorite,
        );
    }
    async getAll(): Promise<Array<Technologies>> {
        const technologiesFromDb = await prisma.technologies.findMany();

        const technologies = technologiesFromDb.map(
            (technologie) =>
                new Technologies(
                    technologie.id,
                    technologie.order,
                    technologie.name,
                    technologie.favorite,
                ),
        );

        return technologies;
    }
    async getById(id: string): Promise<Technologies | null> {
        const technologieFromDb = await prisma.technologies.findUnique({
            where: { id },
        });

        if (!technologieFromDb) return null;

        return new Technologies(
            technologieFromDb.id,
            technologieFromDb.order,
            technologieFromDb.name,
            technologieFromDb.favorite,
        );
    }
    async update(
        id: string,
        technologieData: Partial<Omit<Technologies, "id">>,
    ): Promise<Technologies | null> {
        const technologie = await prisma.technologies.update({
            where: { id },
            data: technologieData,
        });
        if (!technologie) return null;

        return new Technologies(
            technologie.id,
            technologie.order,
            technologie.name,
            technologie.favorite,
        );
    }
    async delete(id: string): Promise<Technologies | null> {
        const technologieFromDb = await prisma.technologies.delete({
            where: { id },
        });

        if (!technologieFromDb) return null;

        return new Technologies(
            technologieFromDb.id,
            technologieFromDb.order,
            technologieFromDb.name,
            technologieFromDb.favorite,
        );
    }
}
