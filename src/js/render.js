export class Renderer {
    constructor(lang = 'pt', profile = 'fullstack') {
        this.lang = lang;
        this.profile = profile;
    }

    async renderExperience() {
        try {
            const response = await fetch('data/experience.json');
            const data = await response.json();
            const container = document.getElementById('experience-container');
            if (!container) return;

            const filteredData = data
                .filter(exp => exp.tags.includes(this.profile))
                .sort((a, b) => (b.priority[this.profile] || 0) - (a.priority[this.profile] || 0));

            container.innerHTML = filteredData.map(exp => `
                <article class="experience-card" style="border-left: 5px solid var(--primary-color); padding-left: 15px; margin-bottom: 20px;">
                    <div class="card-header">
                        <h3 style="color: var(--primary-color);">${exp.role[this.lang]}</h3>
                        <span class="period">${exp.period}</span>
                    </div>
                    <h4 class="company">${exp.company}</h4>
                    <p class="description">${exp.description[this.lang]}</p>
                </article>
            `).join('');
        } catch (error) {
            console.error("Erro na renderização de experiências:", error);
        }
    }

    async renderSummary() {
        try {
            const response = await fetch('data/summary.json');
            const data = await response.json();
            const container = document.getElementById('summary-text');

            if (!container) return;

            // Pega o texto baseado no perfil e no idioma
            const text = data[this.profile][this.lang];
            container.innerText = text;

        } catch (error) {
            console.error("Erro ao carregar resumo:", error);
        }
    }

    // NOVO MÉTODO: Renderizar Projetos
    async renderProjects() {
        try {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            const container = document.getElementById('projects-container');
            if (!container) return;

            const filteredProjects = data
                .filter(proj => proj.tags.includes(this.profile))
                .sort((a, b) => (b.priority[this.profile] || 0) - (a.priority[this.profile] || 0));

            container.innerHTML = filteredProjects.map(proj => `
                <div class="project-card">
                    <h3 class="project-title">${proj.title}</h3>
                    <div class="project-tags">
                        ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                    <p class="project-description">${proj.description[this.lang]}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error("Erro na renderização de projetos:", error);
        }
    }

    async renderSkills() {
        try {
            const response = await fetch('data/skills.json');
            const data = await response.json();
            const container = document.getElementById('skills-container');
            if (!container) return;

            container.innerHTML = Object.entries(data).map(([category, langObj]) => `
            <div class="skill-category">
                <h4>${category}</h4>
                <div class="skill-badges">
                    ${langObj[this.lang].map(skill => `<span class="badge-skill">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
        } catch (error) {
            console.error("Erro ao renderizar skills:", error);
        }
    }

    async renderEducation() {
        const response = await fetch('data/education.json');
        const data = await response.json();
        const container = document.getElementById('education-container');
        if (!container) return;

        container.innerHTML = data.map(edu => `
        <div style="margin-top: 15px;">
            <h4 style="margin: 0; color: var(--primary-color);">${edu.degree[this.lang]}</h4>
            <p style="margin: 5px 0; font-size: 0.9rem;">${edu.institution} | ${edu.period}</p>
        </div>
    `).join('');
    }

    async renderLanguages() {
        const response = await fetch('data/languages.json');
        const data = await response.json();
        const container = document.getElementById('languages-container');
        if (!container) return;

        container.innerHTML = data.map(lang => `
        <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600;">${lang.language[this.lang]}</span>
            <span class="badge-skill" style="font-size: 0.7rem;">${lang.level[this.lang]}</span>
        </div>
    `).join('');
    }
}