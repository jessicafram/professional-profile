export class I18n {
    constructor(lang = 'pt') {
        this.lang = lang;
    }

    async loadTranslations() {
        try {
            const response = await fetch(`./src/locales/${this.lang}.json`);
            const translations = await response.json();
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) el.innerText = translations[key];
            });
        } catch (error) { console.error("Erro I18n:", error); }
    }

    setLanguage(newLang) {
        this.lang = newLang;
        this.loadTranslations();
    }
}