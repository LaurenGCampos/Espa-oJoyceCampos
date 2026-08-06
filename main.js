document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '5515998483691';

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const themeToggleIconMobile = document.getElementById('theme-toggle-icon-mobile');

  function updateThemeUI(theme) {
    const isLight = theme === 'light';
    
    [themeToggleIcon, themeToggleIconMobile].forEach(icon => {
      if (icon) {
        if (isLight) {
          icon.className = 'fa-solid fa-moon text-amber-600';
        } else {
          icon.className = 'fa-solid fa-sun text-amber-400';
        }
      }
    });

    [themeToggleBtn, themeToggleBtnMobile].forEach(btn => {
      if (btn) {
        btn.setAttribute('aria-label', isLight ? 'Mudar para modo escuro' : 'Mudar para modo claro');
      }
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
  }

  const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleBtnMobile) {
    themeToggleBtnMobile.addEventListener('click', toggleTheme);
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) {
          mobileMenuIcon.classList.remove('fa-xmark');
          mobileMenuIcon.classList.add('fa-bars');
        }
      } else {
        mobileMenu.classList.remove('hidden');
        if (mobileMenuIcon) {
          mobileMenuIcon.classList.remove('fa-bars');
          mobileMenuIcon.classList.add('fa-xmark');
        }
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) {
          mobileMenuIcon.classList.remove('fa-xmark');
          mobileMenuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  const filterTabs = document.querySelectorAll('.filter-tab');
  const categorySections = document.querySelectorAll('.category-section');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      categorySections.forEach(section => {
        const cat = section.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue) {
          section.style.display = 'block';
          section.style.opacity = '1';
        } else {
          section.style.display = 'none';
          section.style.opacity = '0';
        }
      });
    });
  });

  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isOpen = accordionItem.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const content = item.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      if (!isOpen) {
        accordionItem.classList.add('active');
        const content = accordionItem.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  window.agendarWhatsApp = function(nomeServico = '') {
    let mensagem = 'Olá Joyce! Vim pelo seu site e gostaria de agendar um horário no Espaço Joyce Campos.';
    if (nomeServico) {
      mensagem = `Olá Joyce! Vim pelo seu site e gostaria de agendar o serviço: *${nomeServico}*. Como funciona a sua disponibilidade de horário?`;
    }
    const encodedMsg = encodeURIComponent(mensagem);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-xl', 'border-amber-500/20');
    } else {
      navbar.classList.remove('shadow-xl', 'border-amber-500/20');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeader = document.getElementById('navbar');
          const navHeight = navHeader ? navHeader.offsetHeight : 80;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight - 16;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
