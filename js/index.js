if (location.hostname === 'shmuel-shif.github.io') {
    const base = document.createElement('base')
    base.href = '/roter/'
    document.head.appendChild(base)
}

function scrollToFooter(e) {
    e.preventDefault();
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
}

// אנימציית גלילה לכרטיסים
const cards = document.querySelectorAll('.menu-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // מוסיף דיליי הדרגתי לכל כרטיס
            setTimeout(() => {
                entry.target.classList.add('slide-in');
            }, index * 200); // 200ms דיליי בין כל כרטיס
        }
    });
}, { threshold: 0.1 }); // מתחיל את האנימציה כשהכרטיס נראה 10%

cards.forEach(card => observer.observe(card));