export class I18n {
    constructor(lang = 'pt') {
        this.lang = lang;
    }

    async loadTranslations() {
        const response = await fetch(`src/locales/${this.lang}.json`);
        const translations = await response.json();

        // Aplica as traduções nos elementos que têm o atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.innerText = translations[key];
            }
        });
    }

    setLanguage(newLang) {
        this.lang = newLang;
        this.loadTranslations();
    }
}