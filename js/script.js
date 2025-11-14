// Configurações
const config = {
    whatsapp: {
        groupCode: 'FAJHqx3hTqG7M0jfz8m82g' // Código do grupo do WhatsApp
    },
    instagram: 'prom0ae', // Apenas o nome de usuário
    tiktok: 'promoaee'   // Apenas o nome de usuário
};

// Função para verificar se é um dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para abrir o WhatsApp com o grupo
function openWhatsApp() {
    joinWhatsAppGroup(); // Redireciona para a função de entrar no grupo
}

// Função para entrar no grupo do WhatsApp
function joinWhatsAppGroup() {
    // URL do grupo no formato web
    const webUrl = `https://chat.whatsapp.com/${config.whatsapp.groupCode}`;
    
    // Tenta abrir o app nativo primeiro em dispositivos móveis
    if (isMobile()) {
        // Primeiro, tenta abrir o app nativo do WhatsApp com o link direto
        const appUrl = `whatsapp://chat?code=${config.whatsapp.groupCode}`;
        
        // Função para verificar se o app foi aberto
        const checkIfAppOpened = () => {
            const isPageHidden = document.hidden || document.webkitHidden;
            if (!isPageHidden) {
                // Se a página ainda estiver visível após um curto período, tenta abrir o link da web
                window.location.href = webUrl;
            }
        };
        
        // Tenta abrir o app nativo
        window.location.href = appUrl;
        
        // Configura o fallback
        const fallbackTimer = setTimeout(checkIfAppOpened, 1000);
        
        // Adiciona listeners para detectar se o app foi aberto
        const visibilityChangeHandler = () => {
            if (document.hidden || document.webkitHidden) {
                // Se a página ficou oculta, o app provavelmente abriu
                clearTimeout(fallbackTimer);
            }
        };
        
        document.addEventListener('visibilitychange', visibilityChangeHandler);
        document.addEventListener('webkitvisibilitychange', visibilityChangeHandler);
        
        // Limpa os listeners após um tempo
        setTimeout(() => {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
            document.removeEventListener('webkitvisibilitychange', visibilityChangeHandler);
        }, 2000);
        
    } else {
        // Para desktop, abre em uma nova aba
        window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configura o botão do WhatsApp para abrir o grupo
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            joinWhatsAppGroup();
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
        const appUrl = `instagram://user?username=${config.instagram}`;
        const webUrl = `https://www.instagram.com/${config.instagram}`;
        
        if (isMobile) {
            // Tenta abrir o app nativo
            window.location.href = appUrl;
            
            // Fallback para web se não abrir o app
            setTimeout(() => {
                if (!document.hidden && !document.webkitHidden) {
                    window.location.href = webUrl;
                }
            }, 500);
        } else {
            // Para desktop, abre em uma nova aba
            window.open(webUrl, '_blank', 'noopener,noreferrer');
        }
    }

    // Configura os links de redes sociais
    const instagramLink = document.getElementById('instagramSocial');
    if (instagramLink) {
        instagramLink.href = `https://www.instagram.com/${config.instagram}`;
        instagramLink.target = '_blank';
        instagramLink.rel = 'noopener noreferrer';
    }

    // Função para abrir o TikTok
    function openTikTok(e) {
        if (e) e.preventDefault();
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const appUrl = `tiktok://@${config.tiktok}`;
        const webUrl = `https://www.tiktok.com/@${config.tiktok}`;
        
        if (isMobile) {
            // Tenta abrir o app nativo
            window.location.href = appUrl;
            
            // Fallback para web se não abrir o app
            setTimeout(() => {
                if (!document.hidden && !document.webkitHidden) {
                    window.location.href = webUrl;
                }
            }, 500);
        } else {
            // Para desktop, abre em uma nova aba
            window.open(webUrl, '_blank', 'noopener,noreferrer');
        }
    }
    
    // Configura os links de redes sociais
    const tiktokLink = document.getElementById('tiktokSocial');
    if (tiktokLink) {
        tiktokLink.href = `#`;
        tiktokLink.addEventListener('click', openTikTok);
    }
    
    // Configura o botão do WhatsApp no cabeçalho
    const whatsappSocial = document.getElementById('whatsappSocial');
    if (whatsappSocial) {
        whatsappSocial.addEventListener('click', function(e) {
            e.preventDefault();
            joinWhatsAppGroup();
        });
    }
    
    // Adiciona classe de carregado ao body para animações
    document.body.classList.add('loaded');
});

// Adiciona classe de carregamento suave
document.documentElement.classList.add('js-loading');

window.addEventListener('load', function() {
    document.documentElement.classList.remove('js-loading');
});
