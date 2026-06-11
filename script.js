// Menu Mobile
const mobileMenuBtn = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fecha menu mobile se estiver aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Newsletter
const subscribeBtn = document.getElementById('btnSubscribe');
const emailInput = document.getElementById('emailNews');
const feedback = document.getElementById('feedbackMsg');

if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        
        if (!email) {
            feedback.innerHTML = '✉️ Por favor, insira um e-mail para receber novidades sustentáveis.';
            feedback.style.color = '#b34e3a';
        } else if (!emailPattern.test(email)) {
            feedback.innerHTML = '⚠️ E-mail inválido. Use um formato como nome@exemplo.com';
            feedback.style.color = '#b34e3a';
        } else {
            feedback.innerHTML = '✅ Obrigado por se inscrever! Você agora faz parte do AgroInteligente. 🌱';
            feedback.style.color = '#1e4a2f';
            emailInput.value = '';
            
            // Armazenar no localStorage (simulação)
            let inscricoes = JSON.parse(localStorage.getItem('newsletter_agro')) || [];
            inscricoes.push({ email: email, data: new Date().toISOString() });
            localStorage.setItem('newsletter_agro', JSON.stringify(inscricoes));
            
            console.log(`Newsletter inscrito: ${email}`);
        }
        
        setTimeout(() => {
            if(feedback.innerHTML.includes('Obrigado')) {
                setTimeout(() => { feedback.innerHTML = ''; }, 4000);
            } else {
                setTimeout(() => { feedback.innerHTML = ''; }, 3000);
            }
        }, 4000);
    });
}

// Animação ao rolar (efeito fade nos cards)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .stat-item, .two-col').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contador animado para estatísticas (bônus)
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item h4');
    stats.forEach(stat => {
        const text = stat.innerText;
        const value = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (!isNaN(value)) {
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    stat.innerText = value + suffix;
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.floor(current) + suffix;
                }
            }, 25);
        }
    });
}

// Disparar contadores quando a seção de stats ficar visível
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) {
    statsObserver.observe(statsBanner);
}

// Ano atual no footer (opcional)
const yearElement = document.querySelector('.copyright');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}
