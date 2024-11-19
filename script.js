// Fonction pour vérifier si un élément est visible dans la fenêtre
function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight; // Vérifie si le haut de l'élément est dans la fenêtre
}

// Ajouter une animation aux sections au défilement
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((element) => {
        if (isVisible(element)) {
            element.style.opacity = '1'; // Rendre visible
            element.style.transform = 'translateY(0)'; // Ramener à sa position normale
        }
    });
}

// Initialisation : rendre les éléments invisibles au départ
document.querySelectorAll('[data-animate]').forEach((element) => {
    element.style.opacity = '0'; // Invisible
    element.style.transform = 'translateY(50px)'; // Légèrement décalé vers le bas
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Animation douce
});

// Ajouter un écouteur d'événements pour lancer l'animation lors du défilement
window.addEventListener('scroll', animateOnScroll);


// Écouter l'événement de soumission du formulaire
document.querySelector('.contact-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche l'envoi par défaut

    // Récupérer les valeurs des champs
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    // Vérifier que les champs ne sont pas vides
    if (!name || !email || !message) {
        alert('Tous les champs doivent être remplis.');
        return; // Arrête l'exécution si un champ est vide
    }

    // Vérifier si l'email est valide
    if (!email.includes('@') || !email.includes('.')) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Si tout est bon, afficher un message de succès
    alert('Merci, votre message a été envoyé !');
});

// Ajout d'une navigation douce pour les liens du header
document.querySelectorAll('header a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut

        const targetId = this.getAttribute('href'); // Récupère l'ID de la cible
        const targetElement = document.querySelector(targetId); // Trouve l'élément correspondant

        // Ajuste pour la hauteur du header
        const headerHeight = document.querySelector('header').offsetHeight;

        // Défilement fluide vers l'élément cible
        window.scrollTo({
            top: targetElement.offsetTop - headerHeight, // Ajuste pour le header sticky
            behavior: 'smooth' // Défilement fluide
        });
    });
});

// Mettre à jour le lien actif lors du défilement
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('header a');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            links.forEach(link => link.classList.remove('active')); // Supprime la classe active
            const activeLink = document.querySelector(`header a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active'); // Ajoute la classe active au bon lien
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

//Activation du menu en version mobile

// Vérifie que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Ajoute l'événement au clic sur le bouton hamburger
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Active ou désactive le menu
    });
});