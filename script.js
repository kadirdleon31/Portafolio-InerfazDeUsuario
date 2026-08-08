/* =====================================================
   PORTAFOLIO DIGITAL — INTERFAZ DE USUARIO
   script.js — interacciones del sitio
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------
     1. NAVBAR: sombra al hacer scroll
     ----------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* -----------------------------------------------------
     2. MENÚ HAMBURGUESA (móvil)
     ----------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cierra el menú al seleccionar un enlace (móvil)
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* -----------------------------------------------------
     3. SCROLL SUAVE (refuerzo para navegadores antiguos)
     ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* -----------------------------------------------------
     4. ANIMACIÓN FADE-UP AL HACER SCROLL
     ----------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach((el) => observer.observe(el));

  /* -----------------------------------------------------
     5. MODAL DE IMÁGENES (Evidencias y Parciales)
     ----------------------------------------------------- */
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  const openModal = (imgSrc, title) => {
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalCaption.textContent = title;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-modal-img]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-modal-img');
      const title = btn.getAttribute('data-modal-title') || '';
      openModal(imgSrc, title);
    });
  });

  modalClose.addEventListener('click', closeModal);

  // Cierra al hacer clic fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Cierra con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

});