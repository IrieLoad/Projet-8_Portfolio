// === Fonction pour vérifier si un élément est visible dans la fenêtre ===
function isVisible(element) {
    const rect = element.getBoundingClientRect(); // Récupère la position et la taille de l'élément par rapport à la fenêtre
    return rect.top < window.innerHeight; // Retourne 'true' si le haut de l'élément est dans la fenêtre visible
}

// === Animation des sections lors du défilement ===
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]'); // Sélectionne tous les éléments ayant l'attribut 'data-animate'
    elements.forEach((element) => {
        if (isVisible(element)) {
            element.style.opacity = '1'; // Rend l'élément visible
            element.style.transform = 'translateY(0)'; // Remet l'élément à sa position d'origine
        }
    });
}

// === Initialisation : rend les éléments invisibles par défaut ===
document.querySelectorAll('[data-animate]').forEach((element) => {
    element.style.opacity = '0'; // Rends l'élément invisible
    element.style.transform = 'translateY(50px)'; // Décale l'élément légèrement vers le bas
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Applique une transition douce pour l'animation
});

// Ajoute un écouteur d'événements pour déclencher l'animation lorsque l'utilisateur défile
window.addEventListener('scroll', animateOnScroll);

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
    alert('Merci, votre message a été envoyé !');
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
    const navLinkItems = document.querySelectorAll('.nav-links a'); // Sélectionne tous les liens du menu

    // Ouvre ou ferme le menu mobile lorsqu'on clique sur le hamburger
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Ajoute ou enlève la classe 'active' pour afficher/masquer le menu
    });

    // Ferme le menu mobile lorsqu'on clique sur un lien
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active'); // Masque le menu déroulant après le clic
        });
    });
});
