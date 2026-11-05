const root = document.documentElement;
const toggleButton = document.getElementById('hamburgerButton');
const navigation = document.getElementById('navbarNav');
const themeButton = document.getElementById('themeToggleButton');
const navigationLinks = document.querySelectorAll('.nav-link');

function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
    try {
        localStorage.setItem('portfolio-theme', theme);
    } catch {
        // Theme still works when storage is unavailable.
    }
}

let savedTheme;
try {
    savedTheme = localStorage.getItem('portfolio-theme');
} catch {
    savedTheme = null;
}
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark');

toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    toggleButton.setAttribute('aria-label', isExpanded ? 'Buka navigasi' : 'Tutup navigasi');
    navigation.classList.toggle('show', !isExpanded);
});

navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.card.navigation-target')?.classList.remove('navigation-target');
        document.getElementById(link.hash.slice(1))?.classList.add('navigation-target');
        navigation.classList.remove('show');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Buka navigasi');
    });
});

function updateActiveLink() {
    const currentHash = window.location.hash || '#profil';
    navigationLinks.forEach(link => {
        const isCurrent = link.getAttribute('href') === currentHash;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}

window.addEventListener('hashchange', updateActiveLink);
updateActiveLink();

themeButton.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
