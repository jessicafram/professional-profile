import { Renderer } from './render.js';
import { I18n } from './i18n.js';

class App {
    constructor() {
        this.lang = 'pt';
        this.profile = 'fullstack';
        this.renderer = new Renderer(this.lang, this.profile);
        this.i18n = new I18n(this.lang);
        this.init();
    }

    async init() {
        try {
            await this.i18n.loadTranslations();
            // Renderiza as duas seções no boot
            await this.renderer.renderExperience();
            await this.renderer.renderProjects();
            await this.renderer.renderSummary();
            await this.renderer.renderSkills();
            await this.renderer.renderEducation();
            await this.renderer.renderLanguages();
            this.bindEvents();
        } catch (error) {
            console.error("Erro no boot:", error);
        }
    }

    bindEvents() {
        // 1. Cliques de Idioma
        document.querySelectorAll('.btn-lang').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedLang = btn.getAttribute('data-lang');
                document.querySelectorAll('.btn-lang').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.lang = selectedLang;
                this.i18n.setLanguage(this.lang);
                this.renderer.lang = this.lang;

                this.renderer.renderSummary();
                this.renderer.renderExperience();
                this.renderer.renderProjects();
                this.renderer.renderSkills();
                this.renderer.renderEducation();
                this.renderer.renderLanguages();
            });
        });

        // 2. Cliques de Perfil
        document.querySelectorAll('.chip-profile').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedProfile = btn.getAttribute('data-profile');
                document.querySelectorAll('.chip-profile').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.profile = selectedProfile;
                this.renderer.profile = this.profile;

                this.renderer.renderSummary();
                this.renderer.renderExperience();
                this.renderer.renderProjects();
                this.renderer.renderSkills();
                this.renderer.renderEducation();
                this.renderer.renderLanguages();
            });
        });

        // 3. Lógica para o Download de PDF (AGORA NO LUGAR CERTO!)
        const pdfBtn = document.getElementById('download-pdf');
        if (pdfBtn) {
            pdfBtn.addEventListener('click', () => {
                setTimeout(() => {
                    window.print();
                }, 100);
            });
        }
    }
}

new App();