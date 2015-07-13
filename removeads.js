// ==UserScript==
// @name	RemoverPublicidades
// @description	Remove anuncios de sites de videos e faz algumas modificacoes pra facilitar a navegacao
// @author	daniel.uramg@gmail.com
// @version	0.27
// @downloadURL	https://raw.githubusercontent.com/danieluramg/MegaFilmesHD.net-Clear/master/removeads.js
// @require	http://ideias.2p.fm/userscripts/userscript.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @match	http://*.megafilmeshd.net/*
// @match	http://*.redecanais.tv/*
// @match	http://*.filmesonlinegratis.net/*
// @match	http://*.vidig.biz/*
// @match	http://*.dropvideo.com/*
// @match	http://*.allmyvideos.net/*
// @match	http://*.flashx.tv/*
// @match	http://*.firedrive.com/*
// @match	http://*.vid2c.com/*
// @match	http://*.vidto.me/*
// @match	http://*.putlocker.com/*
// @match	http://*.firedrive.com/*
// @match	http://*.cloudzilla.to/*
// ==/UserScript==
$(document).ready(function(){
    
    var elements_by_id = ["ad1", "ad2", "divFlutuante", "floatLayer2", "floatLayer3", "fanbox", "nuevob", "acnt", "aclose", "Layer1", "seta1", "seta2", "aviso", "ve_box", "4ds1", "VidLayIFrame", "thf"];
    
    for (i = 0; i < elements_by_id.length; i++) {
        $('#' + elements_by_id[i]).remove();
    }
    
    removeElement("//a[@href='http://flashx.tv/premium.html']");
    removeElement("//a[@href='https://auth.firedrive.com/signup']");
    
    //Modificacoes no MegaFilmesHD.net
    if (location.host === 'www.megafilmeshd.net' || location.host === 'megafilmeshd.net'){
        
        $('#cboxOverlay').remove(); //remove a camada escura de fundo para permitir selecionar outro episodio sem ter de fechar a div
        $('#colorbox').draggable(); //Torna a Div dos videos "movivel" pela pagina
        $('#colorbox').css('border', '5px solid #3300FF'); //Insere borda azul na Div dos videos
        $('p').css('font', 'normal 20px/20px Arial, Helvetica, sans-serif'); //Aumenta fonte da Sinopse
        $('.tt-sinopse').css('font', '18px arial, verdana, tahoma'); //Aumenta fonte da Sinopse
        
        $('.box').width('900px');//Aumenta a Box com a listagem
        $('.moving_tab').width('900px'); //Aumenta a Box com a listagem
        setAttributeOfElement('style','font-size: 16pt',"//a[@class='video cboxElement']"); //Aumentar o tamanho da fonte da listagem
        
        //Funcao em Jquery para mudar Estilo do link das series depois de ser visitada (fica taxado, sublinhado, linha sobreposta e fonte menor)
        $("a").click(function() {
            function setElementThis($element, k, v) {$element.style[k] = v; };
            setElementThis(this, 'textDecoration', 'line-through overline underline');
            setElementThis(this, 'font-size', '14px');
        })
    }
    
    //Fecha delay do firedrive.com
    if(location.host === "www.firedrive.com" || location.host === "firedrive.com")
    {
        setTimeout(function() {document.getElementById("confirm_form").submit();return false;},500);
        setTimeout(function() {loadplayer();return false;},1000);
    }
    
    // Fecha delay do Vidto.me
    if(location.host === "www.vidto.me" || location.host === "vidto.me"){setTimeout(function() {document.forms[1].submit();return false;},7000);}
    
    // Fecha Div do Allmyvideos.net
    if(location.host === "www.allmyvideos.net" || location.host === "allmyvideos.net"){setTimeout(function() {$("#" + onplayspotid).remove();},1000);}
    
    
    // Fechar publicidade Dropvideo.com
    if(location.host === "www.dropvideo.com" || location.host === "dropvideo.com"){rmOv();}
    
})
