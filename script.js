document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Intersection Observer para Animações Scroll Reveal (estilo Behance)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Navbar Efeito de Blur & Sombra ao rolar
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // 4. Botões de Serviço com redirecionamento personalizado para WhatsApp
  const serviceButtons = document.querySelectorAll('.service-cta-btn');
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service') || 'Transporte Executivo';
      const text = encodeURIComponent(`Olá! Gostaria de um orçamento para o serviço de: ${serviceName} com a PH Transfer.`);
      window.open(`https://wa.me/5531988851520?text=${text}`, '_blank');
    });
  });

  // 5. Suavização de scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 6. Seletor de Idioma Multi-língua (Português, Inglês e Espanhol)
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const langArrow = document.getElementById('lang-arrow');
  const currentLangText = document.getElementById('current-lang-text');
  const desktopOptions = document.querySelectorAll('.lang-option');
  const mobileOptions = document.querySelectorAll('.mobile-lang-btn');

  // Alternar Dropdown no Desktop
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = langDropdown.classList.contains('hidden');
      if (isHidden) {
        langDropdown.classList.remove('hidden');
        if (langArrow) langArrow.classList.add('rotate-180');
        langBtn.setAttribute('aria-expanded', 'true');
      } else {
        langDropdown.classList.add('hidden');
        if (langArrow) langArrow.classList.remove('rotate-180');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#lang-switcher-container')) {
        langDropdown.classList.add('hidden');
        if (langArrow) langArrow.classList.remove('rotate-180');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Função para aplicar o idioma
  const applyLanguage = (lang, triggerTranslate = true) => {
    // 1. Atualizar rótulo visível
    const labels = { pt: 'PT/BR', en: 'EN', es: 'ES' };
    if (currentLangText) {
      currentLangText.textContent = labels[lang] || 'PT/BR';
    }

    // 2. Atualizar estado ativo nos botões desktop
    desktopOptions.forEach(opt => {
      const optLang = opt.getAttribute('data-lang');
      if (optLang === lang) {
        opt.classList.add('bg-white/10', 'text-white', 'font-semibold');
        opt.classList.remove('text-zinc-300', 'font-medium');
      } else {
        opt.classList.remove('bg-white/10', 'text-white', 'font-semibold');
        opt.classList.add('text-zinc-300', 'font-medium');
      }
    });

    // 3. Atualizar estado ativo nos botões mobile
    mobileOptions.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active', 'bg-white/20', 'text-white');
        btn.classList.remove('bg-white/5', 'text-zinc-400');
      } else {
        btn.classList.remove('active', 'bg-white/20', 'text-white');
        btn.classList.add('bg-white/5', 'text-zinc-400');
      }
    });

    // 4. Salvar preferência
    localStorage.setItem('ph_transfer_lang', lang);

    // 5. Configurar Google Translate Cookie
    if (triggerTranslate) {
      if (lang === 'pt') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      } else {
        document.cookie = `googtrans=/pt/${lang}; path=/;`;
        document.cookie = `googtrans=/pt/${lang}; path=/; domain=${window.location.hostname}`;
      }

      // Disparar combo se disponível
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
      } else {
        // Se ainda não inicializou o combo do Google Translate, recarregar para aplicar o cookie
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    }

    // Fechar dropdown
    if (langDropdown) {
      langDropdown.classList.add('hidden');
      if (langArrow) langArrow.classList.remove('rotate-180');
    }
  };

  // Event Listeners nos Botões Desktop
  desktopOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selected = opt.getAttribute('data-lang');
      applyLanguage(selected, true);
    });
  });

  // Event Listeners nos Botões Mobile
  mobileOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      applyLanguage(selected, true);
    });
  });

  // Inicialização no carregamento
  const savedLang = localStorage.getItem('ph_transfer_lang') || 'pt';
  if (savedLang !== 'pt') {
    applyLanguage(savedLang, false);
  }

  // 7. Carrossel Oficial da Frota (7 Modelos Oficiais - Táxis Executivos)
  const fleetTrack = document.getElementById('fleet-carousel-track');
  const fleetPrevBtn = document.getElementById('fleet-prev-btn');
  const fleetNextBtn = document.getElementById('fleet-next-btn');
  const fleetDotsContainer = document.getElementById('fleet-dots');

  if (fleetTrack) {
    const fleetCards = fleetTrack.querySelectorAll('.fleet-carousel-card');
    const totalFleetCards = fleetCards.length;
    let activeFleetIndex = 0;
    let fleetAutoPlayTimer = null;

    // Gerar dots indicadores dinamicamente
    if (fleetDotsContainer) {
      fleetDotsContainer.innerHTML = '';
      for (let i = 0; i < totalFleetCards; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `h-2 rounded-full transition-all duration-300 cursor-pointer ${i === 0 ? 'w-6 bg-white' : 'w-2 bg-white/20 hover:bg-white/50'}`;
        dot.setAttribute('aria-label', `Ir para veículo ${i + 1}`);
        dot.addEventListener('click', () => {
          scrollToFleetCard(i);
          resetFleetAutoPlay();
        });
        fleetDotsContainer.appendChild(dot);
      }
    }

    const updateFleetDots = (index) => {
      if (!fleetDotsContainer) return;
      const dots = fleetDotsContainer.querySelectorAll('button');
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.className = 'w-6 h-2 rounded-full bg-white transition-all duration-300 cursor-pointer';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 transition-all duration-300 cursor-pointer';
        }
      });
    };

    const getCardStep = () => {
      const firstCard = fleetCards[0];
      return firstCard ? firstCard.getBoundingClientRect().width + 20 : 290;
    };

    const scrollToFleetCard = (index) => {
      activeFleetIndex = (index + totalFleetCards) % totalFleetCards;
      const targetCard = fleetCards[activeFleetIndex];
      if (targetCard) {
        const cardRect = targetCard.getBoundingClientRect();
        const trackRect = fleetTrack.getBoundingClientRect();
        const scrollDelta = cardRect.left - trackRect.left;
        fleetTrack.scrollBy({ left: scrollDelta, behavior: 'smooth' });
        updateFleetDots(activeFleetIndex);
      }
    };

    if (fleetPrevBtn) {
      fleetPrevBtn.addEventListener('click', () => {
        const cardStep = getCardStep();
        if (fleetTrack.scrollLeft <= 10) {
          fleetTrack.scrollTo({ left: fleetTrack.scrollWidth, behavior: 'smooth' });
        } else {
          fleetTrack.scrollBy({ left: -cardStep, behavior: 'smooth' });
        }
        resetFleetAutoPlay();
      });
    }

    if (fleetNextBtn) {
      fleetNextBtn.addEventListener('click', () => {
        const cardStep = getCardStep();
        const maxScroll = fleetTrack.scrollWidth - fleetTrack.clientWidth;
        if (fleetTrack.scrollLeft >= maxScroll - 10) {
          fleetTrack.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          fleetTrack.scrollBy({ left: cardStep, behavior: 'smooth' });
        }
        resetFleetAutoPlay();
      });
    }

    // Atualiza indicador ao scrollar pelo mouse ou swipe
    fleetTrack.addEventListener('scroll', () => {
      const scrollLeft = fleetTrack.scrollLeft;
      let closestIdx = 0;
      let minDiff = Infinity;
      fleetCards.forEach((card, i) => {
        const diff = Math.abs((card.offsetLeft - fleetTrack.offsetLeft - 16) - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });
      if (closestIdx !== activeFleetIndex) {
        activeFleetIndex = closestIdx;
        updateFleetDots(activeFleetIndex);
      }
    }, { passive: true });

    // Autoplay fluido com pausa no hover
    const startFleetAutoPlay = () => {
      if (fleetAutoPlayTimer) clearInterval(fleetAutoPlayTimer);
      fleetAutoPlayTimer = setInterval(() => {
        const cardStep = getCardStep();
        const maxScroll = fleetTrack.scrollWidth - fleetTrack.clientWidth;
        if (fleetTrack.scrollLeft >= maxScroll - 10) {
          fleetTrack.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          fleetTrack.scrollBy({ left: cardStep, behavior: 'smooth' });
        }
      }, 4000);
    };

    const resetFleetAutoPlay = () => {
      if (fleetAutoPlayTimer) {
        clearInterval(fleetAutoPlayTimer);
        startFleetAutoPlay();
      }
    };

    fleetTrack.addEventListener('mouseenter', () => {
      if (fleetAutoPlayTimer) clearInterval(fleetAutoPlayTimer);
    });
    fleetTrack.addEventListener('mouseleave', () => {
      startFleetAutoPlay();
    });

    // Touch swipe support
    let touchStartX = 0;
    fleetTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      if (fleetAutoPlayTimer) clearInterval(fleetAutoPlayTimer);
    }, { passive: true });

    fleetTrack.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          scrollToFleetCard(activeFleetIndex + 1);
        } else {
          scrollToFleetCard(activeFleetIndex - 1);
        }
      }
      resetFleetAutoPlay();
    }, { passive: true });

    startFleetAutoPlay();
  }

  // 8. Protocolo Essenza Interativo (Clique nas frases em cima -> Muda foto e detalhes embaixo)
  const essenzaCards = document.querySelectorAll('.essenza-card');
  const essenzaSlides = document.querySelectorAll('.essenza-slide');
  let currentEssenzaIndex = 0;

  const showEssenzaSlide = (index) => {
    if (!essenzaSlides.length) return;
    currentEssenzaIndex = (index + essenzaSlides.length) % essenzaSlides.length;

    // 1. Atualizar cards superiores
    essenzaCards.forEach((card, i) => {
      const numSpan = card.querySelector('.essenza-num');
      const dotSpan = card.querySelector('.essenza-dot');
      const hintSpan = card.querySelector('.essenza-hint');

      if (i === currentEssenzaIndex) {
        card.classList.add('active', 'border-white/50', 'bg-white/10', 'shadow-lg', 'scale-[1.02]', 'ring-1', 'ring-white/20');
        if (numSpan) {
          numSpan.classList.add('text-white', 'font-bold');
          numSpan.classList.remove('text-zinc-500');
        }
        if (dotSpan) {
          dotSpan.classList.remove('bg-transparent');
          dotSpan.classList.add('bg-emerald-400');
        }
        if (hintSpan) {
          hintSpan.textContent = 'Ativo agora';
          hintSpan.classList.add('text-emerald-400', 'font-medium');
        }

        // No mobile, rolar suavemente o card ativo para o centro da barra horizontal
        if (window.innerWidth < 768) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        card.classList.remove('active', 'border-white/50', 'bg-white/10', 'shadow-lg', 'scale-[1.02]', 'ring-1', 'ring-white/20');
        if (numSpan) {
          numSpan.classList.remove('text-white', 'font-bold');
          numSpan.classList.add('text-zinc-500');
        }
        if (dotSpan) {
          dotSpan.classList.remove('bg-emerald-400');
          dotSpan.classList.add('bg-transparent');
        }
        if (hintSpan) {
          hintSpan.textContent = 'Clique para ver';
          hintSpan.classList.remove('text-emerald-400', 'font-medium');
        }
      }
    });

    // 2. Atualizar slides inferiores com fade
    essenzaSlides.forEach((slide, i) => {
      if (i === currentEssenzaIndex) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'invisible');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'visible');
      } else {
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'visible');
        slide.classList.add('opacity-0', 'pointer-events-none', 'invisible');
      }
    });
  };

  essenzaCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-essenza-index'), 10);
      showEssenzaSlide(idx);
    });
  });

  // Suporte a gestos touch swipe no painel de fotos do Essenza
  const essenzaBox = document.getElementById('essenza-display-box');
  if (essenzaBox) {
    let essenzaTouchStartX = 0;
    essenzaBox.addEventListener('touchstart', (e) => {
      essenzaTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    essenzaBox.addEventListener('touchend', (e) => {
      const essenzaTouchEndX = e.changedTouches[0].screenX;
      const diff = essenzaTouchStartX - essenzaTouchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          showEssenzaSlide(currentEssenzaIndex + 1);
        } else {
          showEssenzaSlide(currentEssenzaIndex - 1);
        }
      }
    }, { passive: true });
  }
});
