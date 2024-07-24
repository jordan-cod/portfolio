export class Project {
    constructor(
        public id: string,
        public order: number,
        public title: string,
        public description_pt: string,
        public description_en: string,
        public technologies: string,
        public imageUrl: string,
        public repoUrl: string,
        public liveUrl: string,
        public favorite: boolean,
        public date: Date,
    ) {}

    isFavorite(): boolean {
        return this.favorite;
    }
}
