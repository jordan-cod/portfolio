export class Technologies {
    constructor(
        public id: string,
        public order: number,
        public name: string,
        public favorite: boolean,
    ) {}

    isFavorite(): boolean {
        return this.favorite;
    }
}
