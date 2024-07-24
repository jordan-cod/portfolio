export interface Repository<T> {
    create(data: Omit<T, "id">): Promise<T>;
    getById(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    update(id: string, data: Partial<Omit<T, "id">>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
