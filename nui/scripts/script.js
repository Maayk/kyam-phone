var appatual = ""

console.log('[phone] sistema iniciado');
console.log('[phone] versão 1.0.0');

$(document).ready(function(){
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case "abrir":
                console.log('opa cheguei aqui em')
        }
    })
});

$(document).on('click', '.aplicativo', function(e) {
    var nomeapp = e.target || e.srcElement;
    if (nomeapp.id) {
        appatual = nomeapp.id
        console.log('[phone] app ['+appatual+'] iniciado');
        let content=document.querySelector('.paginacao');
        fetch('pages/'+nomeapp.id+'.html')
            .then( r=>r.text() )
            .then( html=>{
                content.insertAdjacentHTML('afterbegin',html)
        })
        $(".paginacao").fadeIn(100).css({"border-radius":"50%", "top":"-0.1vh", "left":"-0.1vh", "width":"27.7vh", "height":"51.5vh", "display":"block"}).fadeIn(100);
        $(".topbar-"+appatual).css("color", "black");
    }
});

$(document).on('click', '.home', function(e) {
    if (appatual != "") {
        console.log('[phone] fechando app...');
        $(".content-"+appatual).addClass('scale-transition scale-out').fadeOut(150); 
        $(".paginacao").css({"border-radius":"30%", "background-color":"transparent"});

        $(".topbar").css("color", "white");
        setTimeout(function(){
            console.log('[phone] app '+appatual+' fechado com sucesso');
            $(".paginacao").removeClass('scale-transition scale-out').css({"display":"none", "top":"45vh", "left":"11.3vh", "width":"25%", "height":"7vh"}).empty(); 
            appatual = ""
        }, 150);
    }
});