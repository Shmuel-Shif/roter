if (location.hostname === 'shmuel-shif.github.io') {
    const base = document.createElement('base')
    base.href = '/roter/'
    document.head.appendChild(base)
}

function scrollToFooter(e) {
    e.preventDefault();
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
}