$(document).ready(function(){
    let appatual = "";
    let cache = {}; // Objeto para armazenar o conteúdo em cache
    const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora em milissegundos
    const CACHE_CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutos em milissegundos
    let cacheCleanupTimer;

    const PHONE_PREFIX = '[phone]';
    const PAGES_PATH = 'pages/';
    const VERSION_SYS = '1.0.0';

    console.log(`${PHONE_PREFIX} Sistema Reborn Phone iniciado`);
    console.log(`${PHONE_PREFIX} Version ${VERSION_SYS}`);

    // Função para abrir um aplicativo
    function abrirApp(nomeApp) {
        console.log(`${PHONE_PREFIX} Tentando abrir o aplicativo ${nomeApp}`);
        if (appatual === nomeApp) return; // Evita abrir o mesmo aplicativo novamente
        fecharApp(); // Fecha o aplicativo atual

        if (cache[nomeApp]) { // Verifica se o conteúdo está em cache
            console.log(`${PHONE_PREFIX} carregando ${nomeApp} do cache`);
            exibirConteudo(cache[nomeApp]);
        } else {
            console.log(`${PHONE_PREFIX} buscando ${nomeApp}.html`);
            fetch(`${PAGES_PATH}${nomeApp}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar página');
                    }
                    return response.text();
                })
                .then(html => {
                    console.log(`${PHONE_PREFIX} ${nomeApp} carregado`);
                    cache[nomeApp] = html; // Armazena apenas o HTML em cache
                    exibirConteudo(html);
                })
                .catch(error => {
                    console.error(`${PHONE_PREFIX} Erro: ${error.message}`);
                });
        }
        
        appatual = nomeApp;
    }

    // Função para exibir o conteúdo do aplicativo
    function exibirConteudo(html) {
        let content = document.querySelector('.paginacao');
        content.innerHTML = html;
        console.log(content.innerHTML)

        $(".paginacao").fadeIn(100).css({"border-radius":"50%", "top":"-0.1vh", "left":"-0.1vh", "width":"27.7vh", "height":"51.5vh", "display":"block"}).fadeIn(100);
        $(".topbar-" + appatual).css("color", "black");
    }

    // Função para fechar o aplicativo
    function fecharApp() {
        if (!appatual) return; // Não faz nada se nenhum aplicativo estiver aberto

        console.log(`${PHONE_PREFIX} fechando app ${appatual}...`);
        $(".content-" + appatual).addClass('scale-transition scale-out').fadeOut(150);
        $(".paginacao").css({"border-radius":"30%", "background-color":"transparent"});
        
        
        $(".topbar").css("color", "white");
        setTimeout(() => {
            console.log(`${PHONE_PREFIX} app ${appatual} fechado com sucesso`);
            $(".paginacao").removeClass('scale-transition scale-out').css({"display":"none", "top":"45vh", "left":"11.3vh", "width":"25%", "height":"7vh"}).empty();
            appatual = "";
            console.log('App atual 3: '+appatual)
        }, 150);
        
    }

    // Função para limpar o cache expirado
    function limparCache() {
        const now = Date.now();
        for (let key in cache) {
            if (now - cache[key].timestamp > CACHE_EXPIRATION_TIME) {
                delete cache[key];
                console.log(`${PHONE_PREFIX} Cache expirado para ${key}`);
            }
        }
    }

    // Inicia o temporizador para limpar o cache periodicamente
    cacheCleanupTimer = setInterval(limparCache, CACHE_CLEANUP_INTERVAL);

    // Event listener para mensagens (opcional)
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case "abrir":
                console.log('Contato com o front');
                break;
            // Adicionar mais casos conforme necessário
        }
    });

    // Delegação de eventos para abrir aplicativos
    $('.aplicativo').click(function() {
        let nomeApp = $(this).attr('id');
        abrirApp(nomeApp);
    });

    // Delegação de eventos para fechar aplicativos
    $('.home').click(function() {
        console.log(`${PHONE_PREFIX} Botão "Home" clicado`);
        fecharApp();
    });
});
