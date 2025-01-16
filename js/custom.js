const loadComponents = async (components) => {
    try {
        // Esegui tutte le richieste di caricamento in parallelo
        const fetchPromises = components.map(({ selector, url }) =>
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Errore nel caricamento di ${url}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then((data) => ({ selector, data }))
        );

        // Attendi tutte le promesse
        const results = await Promise.all(fetchPromises);

        // Inietta i contenuti nelle sezioni corrispondenti
        results.forEach(({ selector, data }) => {
            document.querySelector(selector).innerHTML = data;
        });

        console.log('Tutte le sezioni sono state caricate!');
    } catch (error) {
        console.error('Errore durante il caricamento delle sezioni:', error);
    }
};

// Elenco dei componenti da caricare
const components = [
    { selector: '#header-placeholder', url: './components/header.html' },
    { selector: '#main-placeholder', url: './components/main.html' },
    { selector: '#footer-placeholder', url: './components/footer.html' },
];

// Esegui il caricamento
loadComponents(components);
