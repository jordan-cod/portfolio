export class WorkExperience {
    constructor(
        public id: string,
        public order: number,
        public title_pt: string,
        public title_en: string,
        public company: string,
        public description_pt: string,
        public description_en: string,
        public technologies: string,
        public imageUrl: string,
        public start_date: Date,
        public end_date: Date | null,
    ) {}

    getDuration(): string {
        if (!this.end_date) {
            return "Ongoing";
        }

        const durationMs = this.end_date.getTime() - this.start_date.getTime();
        const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

        const years = Math.floor(durationDays / 365);
        const months = Math.floor((durationDays % 365) / 30);

        const yearsStr =
            years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
        const monthsStr =
            months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";

        return (
            [yearsStr, monthsStr].filter((part) => part !== "").join(", ") ||
            "Less than a day"
        );
    }

    getFormattedPeriod(): string {
        const endDate = this.end_date || new Date();
        const startDate = this.start_date;

        return `${startDate.toLocaleDateString()} - ${
            this.end_date ? this.end_date.toLocaleDateString() : "Present"
        }`;
    }
}
