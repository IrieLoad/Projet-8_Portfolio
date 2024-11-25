// Attendre que tout le contenu HTML de la page soit chargé avant d'exécuter ce code
document.addEventListener('DOMContentLoaded', () => {
    // Étape 1 : Afficher immédiatement les sections spécifiques ("À propos" et "Formation")
    const immediateSections = ['#about', '#formation']; // Liste des ID des sections à afficher directement
    immediateSections.forEach(selector => {
        const section = document.querySelector(selector); // Trouver chaque section dans le DOM
        if (section) { // Vérifier que la section existe
            section.classList.add('visible'); // Ajouter la classe "visible" pour rendre la section visible
        }
    });

    // Étape 2 : Initialiser les animations pour les autres sections (au défilement)
    initScrollAnimations();
});

// Fonction pour gérer les animations au défilement
function initScrollAnimations() {
    // Sélectionner toutes les sections qui ont l'attribut [data-animate]
    const elements = document.querySelectorAll('[data-animate]');

    // Sous-fonction : Vérifier si un élément est visible dans la fenêtre du navigateur
    const isVisible = (element) => {
        const rect = element.getBoundingClientRect(); // Obtenir la position de l'élément par rapport à la fenêtre
        // Vérifier si une partie de l'élément est visible (haut ou bas de l'élément dans la fenêtre)
        return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Sous-fonction : Ajouter la classe "visible" aux éléments visibles
    const animateOnScroll = () => {
        elements.forEach(element => {
            if (isVisible(element)) { // Si l'élément est visible
                element.classList.add('visible'); // Ajouter la classe "visible" pour l'afficher avec une animation
            }
        });
    };

    // Exécuter une première fois au chargement (pour les éléments déjà visibles)
    animateOnScroll();

    // Réécouter l'événement "scroll" pour détecter quand l'utilisateur défile
    window.addEventListener('scroll', animateOnScroll);
}


// === Validation et gestion de l'envoi du formulaire ===
document.querySelector('.contact-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche l'envoi automatique du formulaire

    // Récupère les valeurs des champs du formulaire
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    // Vérifie si les champs sont remplis
    if (!name || !email || !message) {
        alert('Tous les champs doivent être remplis.'); // Alerte si un champ est vide
        return; // Arrête l'exécution de la fonction
    }

    // Vérifie si l'email est valide
    if (!email.includes('@') || !email.includes('.')) {
        alert('Veuillez entrer une adresse email valide.'); // Alerte si l'email est incorrect
        return; // Arrête l'exécution de la fonction
    }

    // Si tout est correct, affiche un message de succès
    alert('Merci, votre message a été envoyé !');
});

// === Ajout d'une navigation douce pour les liens dans le header ===
document.querySelectorAll('header a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        const targetId = this.getAttribute('href'); // Récupère l'ID de la section cible
        const targetElement = document.querySelector(targetId); // Sélectionne la section cible

        // Ajuste le défilement pour tenir compte de la hauteur du header
        const headerHeight = document.querySelector('header').offsetHeight;

        // Fait défiler doucement jusqu'à la section cible
        window.scrollTo({
            top: targetElement.offsetTop - headerHeight, // Positionne la section juste sous le header
            behavior: 'smooth' // Défilement fluide
        });
    });
});

// === Mettre à jour le lien actif dans le menu lors du défilement ===
function updateActiveLink() {
    const sections = document.querySelectorAll('section'); // Sélectionne toutes les sections
    const links = document.querySelectorAll('header .nav-links a'); // Sélectionne tous les liens du menu

    sections.forEach(section => {
        const rect = section.getBoundingClientRect(); // Récupère la position de la section par rapport à la fenêtre
        if (rect.top <= 150 && rect.bottom > 150) { // Vérifie si la section est visible
            // Supprime la classe 'active' de tous les liens
            links.forEach(link => link.classList.remove('active'));
            // Ajoute 'active' au lien correspondant à la section visible
            const activeLink = document.querySelector(`header .nav-links a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Ajoute un écouteur d'événements pour mettre à jour le lien actif lors du défilement
window.addEventListener('scroll', updateActiveLink);

// === Activation du menu en version mobile ===
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'); // Sélectionne le bouton hamburger
    const navLinks = document.querySelector('.nav-links'); // Sélectionne le menu déroulant

        // Ouvre ou ferme le menu mobile lorsqu'on clique sur le hamburger
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Ajoute ou enlève la classe 'active' pour afficher/masquer le menu
        });

        // Ferme le menu mobile lorsqu'on clique sur un lien
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
