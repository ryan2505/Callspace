document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Initialisation du calendrier
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Exemple d'événements
            { title: 'Appel client', start: '2024-09-07T10:00:00' },
            { title: 'Suivi prospect', start: '2024-09-09T14:30:00' }
        ]
    });
    calendar.render();

    // Graphiques pour le dashboard
    function createGraph(elementId, type, data, options) {
        const ctx = document.getElementById(elementId).getContext('2d');
        return new Chart(ctx, {
            type: type,
            data: data,
            options: options
        });
    }

    // Exemple de données pour les graphiques
    const conversionData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Taux de conversion (%)',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const callEfficiencyData = {
        labels: ['Fermés', 'En cours', 'Perdus'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#4da6ff', '#ffd700', '#ff6b6b']
        }]
    };

    const sourceDistributionData = {
        labels: ['Site web', 'Réseaux sociaux', 'Partenaires', 'Autres'],
        datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: ['#4da6ff', '#ff6b6b', '#ffd700', '#66c2a5']
        }]
    };

    const growthForecastData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Croissance prévue',
            data: [100, 120, 150, 170, 200, 220],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    // Options communes pour les graphiques
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false
    };

    // Création des graphiques
    createGraph('graph1', 'line', conversionData, commonOptions);
    createGraph('graph2', 'doughnut', callEfficiencyData, commonOptions);
    createGraph('graph3', 'pie', sourceDistributionData, commonOptions);
    createGraph('graph4', 'line', growthForecastData, commonOptions);

    // Animation de défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Effet parallaxe pour le hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.hero').style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    });

    // Animation des chiffres
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Exemple d'utilisation de l'animation des chiffres
    const prospectCounter = document.getElementById('prospect-counter');
    if (prospectCounter) {
        animateValue(prospectCounter, 0, 1000, 2000);
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simuler l'envoi du formulaire
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }

    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }
});

// Fonction pour ajouter un prospect (simulation)
function ajouterProspect(nom, email, telephone) {
    console.log(`Nouveau prospect ajouté : ${nom}, ${email}, ${telephone}`);
    // Ici, vous ajouteriez la logique pour enregistrer le prospect dans votre base de données
}

// Fonction pour planifier un appel (simulation)
function planifierAppel(prospectId, date, heure) {
    console.log(`Appel planifié pour le prospect ${prospectId} le ${date} à ${heure}`);
    // Ici, vous ajouteriez la logique pour enregistrer l'appel dans votre calendrier
}

// Fonction pour analyser les performances (simulation)
function analyserPerformances() {
    console.log("Analyse des performances en cours...");
    // Ici, vous ajouteriez la logique pour générer des rapports de performance
}