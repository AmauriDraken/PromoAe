// Configurações
const config = {
    whatsapp: {
        number: '553388346755',
        message: 'Olá! Gostaria de entrar no grupo de ofertas do PromoAÊ!',
        groupCode: 'FAJHqx3hTqG7M0jfz8m82g'
    },
    instagram: 'prom0ae', // Apenas o nome de usuário
    tiktok: 'promoaee'   // Apenas o nome de usuário
};

// Função para verificar se é um dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para abrir o WhatsApp com mensagem
function openWhatsApp(number, message) {
    const encodedMessage = encodeURIComponent(message);
    
    if (isMobile()) {
        // Tenta abrir o app nativo
        window.location.href = `whatsapp://send?phone=${number}&text=${encodedMessage}`;
        
        // Fallback para web se não abrir o app
        setTimeout(() => {
            window.location.href = `https://wa.me/${number}?text=${encodedMessage}`;
        }, 2000);
    } else {
        // Para desktop, abre no WhatsApp Web
        window.open(`https://web.whatsapp.com/send?phone=${number}&text=${encodedMessage}`, '_blank');
    }
}

// Função para entrar no grupo do WhatsApp
function joinWhatsAppGroup() {
    if (isMobile()) {
        // Tenta abrir o app nativo
        window.location.href = `whatsapp://chat?code=${config.whatsapp.groupCode}`;
        
        // Fallback para web se não abrir o app
        setTimeout(() => {
            window.location.href = `https://chat.whatsapp.com/${config.whatsapp.groupCode}`;
        }, 2000);
    } else {
        // Para desktop, abre o link do grupo diretamente
        window.open(`https://chat.whatsapp.com/${config.whatsapp.groupCode}`, '_blank');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configura o botão do WhatsApp
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp(
                config.whatsapp.number, 
                'Olá! Gostaria de mais informações sobre as ofertas do PromoAÊ!'
            );
        });
    }
    
    // Configura o botão do grupo
    const groupBtn = document.getElementById('groupBtn');
    if (groupBtn) {
        groupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            joinWhatsAppGroup();
        });
    }
    
    // Função para abrir o Instagram
    function openInstagram(e) {
        if (e) e.preventDefault();
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const instagramUrl = isMobile 
            ? `instagram://user?username=${config.instagram}`
            : `https://www.instagram.com/${config.instagram}`;
        
        // Tenta abrir o app nativo primeiro
        if (isMobile) {
            window.location.href = instagramUrl;
            // Fallback para web se não abrir o app
            setTimeout(() => {
                window.location.href = `https://www.instagram.com/${config.instagram}`;
            }, 500);
        } else {
            window.open(instagramUrl, '_blank');
        }
    }

    // Configura os links de redes sociais
    const instagramLink = document.getElementById('instagramSocial');
    if (instagramLink) {
        instagramLink.href = `https://www.instagram.com/${config.instagram}`;
        instagramLink.target = '_blank';
        instagramLink.rel = 'noopener noreferrer';
        instagramLink.addEventListener('click', openInstagram);
    }

    // Configura o TikTok
    const tiktokLink = document.getElementById('tiktokSocial');
    if (tiktokLink) {
        tiktokLink.href = `https://www.tiktok.com/@${config.tiktok}`;
        tiktokLink.target = '_blank';
        tiktokLink.rel = 'noopener noreferrer';
    }
    
    // Adiciona classe de carregado ao body para animações
    document.body.classList.add('loaded');
});

// Adiciona classe de carregamento suave
document.documentElement.classList.add('js-loading');

window.addEventListener('load', function() {
    document.documentElement.classList.remove('js-loading');
});
