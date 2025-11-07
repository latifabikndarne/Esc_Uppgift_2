const menuBtn = document.getElementById('menuButton');
const overlay = document.getElementById('menuOverlay');
const closeBtn = overlay ? overlay.querySelector('.overlay-close') : null;

let justOpened = false; 
function openMenu() {
  menuBtn.setAttribute('aria-expanded', 'true');
  overlay.hidden = false;
  document.body.classList.add('no-scroll', 'blurred');

  overlay.classList.remove('closing', 'open');
 
  void overlay.offsetWidth;

   requestAnimationFrame(() => {
    overlay.classList.add('open');
  });

 
  justOpened = true;
  setTimeout(() => { justOpened = false; }, 200);

  const firstItem = overlay.querySelector('[role="menuitem"] a');
  if (firstItem) firstItem.focus();
}

function closeMenu() {
  menuBtn.setAttribute('aria-expanded', 'false');

  
  overlay.classList.remove('open', 'closing');
  overlay.hidden = true;

  document.body.classList.remove('no-scroll', 'blurred');
  menuBtn.focus();
}

function toggleMenu() {
  const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
  (isOpen ? closeMenu : openMenu)();
}


menuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); 
  toggleMenu();
});
menuBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
});

if (closeBtn) closeBtn.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !overlay.hidden) closeMenu();
});


overlay.addEventListener('click', e => {
  if (justOpened) return;
  if (e.target === overlay) closeMenu();
});
