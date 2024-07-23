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
                title: "Strata",
                description: {
                    en: "The Strata page was created as a project for the course 'Complete Web Design Course: HTML5, CSS3, and JS + 5 Projects' by professor Daniel Tapia Morales. As one of the course projects, the goal was to develop using only HTML5 and CSS3.",
                    pt: "A página Strata foi criada como projeto do curso Curso Web Design Completo: HTML5, CSS3 e JS + 5 Projetos do professor Daniel Tapia Morales. Como um dos projetos do curso, o intuito foi o desenvolvimento utilizando apenas HTML5 e CSS3.",
                },
                technologies: ["HTML", "CSS"],
                imgUrl: "/teste.png",
                repoUrl: "https://github.com/jordan-cod/Projeto-Strata",
                deployUrl: "https://jordan-cod.github.io/Projeto-Strata/",
                date: "2021-08-28",
            },
            {
                title: "Projeto Fashion",
                description: {
                    en: "The Fashion page was created as a project for the course 'Complete Web Design Course: HTML5, CSS3, and JS + 5 Projects' by professor Daniel Tapia Morales. As one of the course projects, the goal was to develop using only HTML5 and CSS3.",
                    pt: "A página Fashion foi criada como projeto do curso Curso Web Design Completo: HTML5, CSS3 e JS + 5 Projetos do professor Daniel Tapia Morales. Como um dos projetos do curso, o intuito foi o desenvolvimento utilizando apenas HTML5 e CSS3.",
                },
                technologies: ["HTML", "CSS"],
                imgUrl: "/teste.png",
                repoUrl: "https://github.com/jordan-cod/Projeto-Fashion",
                deployUrl: "https://jordan-cod.github.io/Projeto-Fashion/",
                date: "2021-08-28",
            },
            {
                title: "Easy Bank",
                description: {
                    en: "The Easy Bank page was developed as a challenge from the Frontend Mentor website. The main idea was to build the site using only HTML, CSS, and JavaScript.",
                    pt: "A página Easy Bank foi desenvolvida como desafio do site Frontend Mentor. A ideia principal foi desenvolver o site utilizando apenas HTML, CSS e JavaScript.",
                },
                technologies: ["HTML", "CSS", "JavaScript"],
                imgUrl: "/teste.png",
                repoUrl: "https://github.com/jordan-cod/EasyBankLandingPage",
                deployUrl: "https://jordan-cod.github.io/EasyBankLandingPage/",
                date: "2021-07-05",
            },
            {
                title: "Easy Bank",
                description: {
                    en: "The Easy Bank page was developed as a challenge from the Frontend Mentor website. The main idea was to build the site using only HTML, CSS, and JavaScript.",
                    pt: "A página Easy Bank foi desenvolvida como desafio do site Frontend Mentor. A ideia principal foi desenvolver o site utilizando apenas HTML, CSS e JavaScript.",
                },
                technologies: ["HTML", "CSS", "JavaScript"],
                imgUrl: "/teste.png",
                repoUrl: "https://github.com/jordan-cod/EasyBankLandingPage",
                deployUrl: "https://jordan-cod.github.io/EasyBankLandingPage/",
                date: "2021-07-05",
            },
            {
                title: "Easy Bank",
                description: {
                    en: "The Easy Bank page was developed as a challenge from the Frontend Mentor website. The main idea was to build the site using only HTML, CSS, and JavaScript.",
                    pt: "A página Easy Bank foi desenvolvida como desafio do site Frontend Mentor. A ideia principal foi desenvolver o site utilizando apenas HTML, CSS e JavaScript.",
                },
                technologies: ["HTML", "CSS", "JavaScript"],
                imgUrl: "/teste.png",
                repoUrl: "https://github.com/jordan-cod/EasyBankLandingPage",
                deployUrl: "https://jordan-cod.github.io/EasyBankLandingPage/",
                date: "2021-07-05",
            },
            {
                title: "Easy Bank",
                description: {
                    en: "The Easy Bank page was developed as a challenge from the Frontend Mentor website. The main idea was to build the site using only HTML, CSS, and JavaScript.",
                    pt: "A página Easy Bank foi desenvolvida como desafio do site Frontend Mentor. A ideia principal foi desenvolver o site utilizando apenas HTML, CSS e JavaScript.",
                },
                technologies: ["HTML", "CSS", "JavaScript"],
                imgUrl: "/teste.png",
                repoUrl: "https://github.com/jordan-cod/EasyBankLandingPage",
                deployUrl: "https://jordan-cod.github.io/EasyBankLandingPage/",
                date: "2024-07-05",
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
