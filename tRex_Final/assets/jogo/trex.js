/*
    Aluno: Enzo Henrique Silva de Albuquerque
    Disciplina: Programação para Web
    Professor: David Braga
    Matrícula: 21602649
*/

(function () {

    //Variáveis
    var correr;
    var mudarTempo;
    var correndo = false;
    var obstaculoF = 500;
    var obstaculoTempo = 0;
    var frame = 0;
    var deserto;
    var dino;
    var pontuacao;
    var recomecar;
    var fimDeJogo;
    var nuvens;
    var cacto;
    var ptero;
    var velocidade = 1;

    //Constantes
    const FPS = 300;
    const PROB_NUVEM = 5;
    
    
    function Controle(){
        correr = setInterval(Corre, 1000/FPS);
        mudarTempo = setInterval(Dia_Noite, 60000);
        correndo = true;
    }
    // Função responsável por pausar o jogo;
    function Pausar(){
        clearInterval(correr);
        clearInterval(mudarTempo);
        correndo = false;
    }
    //Função responsável por reiniciar o jogo;
    function recomecarJogo(){
        document.body.innerHTML = "";
        Pausar();
        init();
        
    };
    //Função responsável por modificar o o tempo(dia/noite);
    function Dia_Noite(){
        deserto.element.style.backgroundColor = deserto.element.style.backgroundColor == "black" ? "white" : "black";
    };

    //Função responsável por indicar o fim do jogo;
    function fimDeJogoF(){
        if(dino.status == 4){
            dino.corre(); 
        }    
        Pausar();
        recomecar.element.style.visibility = "visible";
        fimDeJogo.element.style.visibility = "visible";
        dino.element.style.backgroundPositionX = dino.sprites.morto;
    }
    //Função que inicia todos os parâmetros do jogo;
    function init() {
        deserto = new Deserto();
        dino = new Dino();
        fimDeJogo = new FimDeJogo();
        pontuacao = new Pontuacao();
        recomecar = new Recomecar();
        obstaculoF = 500;
        obstaculoTempo = 0;
        frame = 0;
        velocidade = 2;
        nuvens = [];
        cacto = [];
        ptero = [];
    };

    window.addEventListener("keydown", function (e) {
        if(dino.element.style.backgroundPositionX == dino.sprites.morto) return;
        if(e.key == "ArrowUp"){
            if(!correndo){
                Controle();
            }else if(dino.status==0){
                dino.status = 1;
            }
        }else if(e.key == "ArrowDown"){
            if(dino.status == 0){
                dino.abaixa();
            }
        }else if(e.key == "p" || e.key == "P"){
            if(correndo){
                Pausar();
            }
            else{
                Controle();
            }
        }
    });

    window.addEventListener("keyup", function (e) {
        if(dino.element.style.backgroundPositionX == dino.sprites.morto) return;
        if(e.key == "ArrowDown"){
            if(dino.status == 4){
                dino.corre();
            }
        }
    });

    window.addEventListener("keypress", function (e) {
        if(e.key == "r" || e.key == "R"){
            recomecarJogo();
        }
    });

class FimDeJogo {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "fim_de_jogo";
            deserto.element.appendChild(this.element);
        }
    }
;

class Recomecar {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "recomecarC";
            deserto.element.appendChild(this.element);
            this.element.onclick = recomecarJogo;
        }
    }
;

    class Pontuacao {
        constructor() {
            this.element = new Array(5);
            this.value = 0;
            for (var i = 0; i < 5; i++) {
                this.element[i] = document.createElement("div");
                this.element[i].className = "num";
                this.element[i].style.right = 10 * i + "px";
                this.element[i].style.backgroundPositionX = "-484px";
                deserto.element.appendChild(this.element[i]);
            }
        }
        incrementa() {
            var i = 0;
            while (true) {
                this.value++;
                if (Math.abs(parseInt(this.element[i].style.backgroundPositionX) + 484) / 10 == 9) {
                    this.element[i++].style.backgroundPositionX = "-484px";
                }
                else {
                    this.element[i].style.backgroundPositionX = (parseInt(this.element[i].style.backgroundPositionX) - 10) + "px";
                    break;
                }
            }
        }
    }


class Deserto {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "deserto";
            document.body.appendChild(this.element);
            this.chao = document.createElement("div");
            this.chao.className = "chao";
            this.chao.style.backgroundPositionX = "0px";
            this.element.appendChild(this.chao);
        }
        mover() {
            this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - velocidade) % 1200 + "px";
        }
    }
;


class ColisaoB {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }
    }
;

class Cacto {
        constructor(n) {
            this.element = document.createElement("div");
            this.element.className = Math.floor(Math.random() * 1000) % 2 == 0 ? "cactoMaior" : "cactoMenor";
            this.element.style.left = "600px";
            this.element.style.bottom = "0px";
            this.width = this.element.className == "cactoMaior" ? 25 : 17;
            this.height = this.element.className == "cactoMaior" ? 50 : 35;
            var temp = 0;
            if (n == 2) {
                temp = this.width;
            }
            else if (n == 3) {
                temp = this.width * 3;
            }
            this.element.style.backgroundPositionX = ((this.element.className == "cactoMaior" ? -326 : -223) - temp) + "px";
            this.element.style.width = this.width * n + "px";
            this.box_maior = [
                [new ColisaoB(0, 0, 7, 38), new ColisaoB(8, 1, 7, 49), new ColisaoB(13, 2, 10, 38)],
                [new ColisaoB(0, 0, 7, 38), new ColisaoB(8, 1, 7, 49), new ColisaoB(13, 2, 10, 38),
                new ColisaoB(this.width, 0, 7, 38), new ColisaoB(this.width + 8, 1, 7, 49), new ColisaoB(this.width + 13, 2, 10, 38)],
                [new ColisaoB(0, 0, 7, 38), new ColisaoB(8, 1, 7, 49), new ColisaoB(13, 2, 10, 38),
                new ColisaoB(this.width, 0, 7, 38), new ColisaoB(this.width + 8, 1, 7, 49), new ColisaoB(this.width + 13, 2, 10, 38),
                new ColisaoB(this.width * 2, 0, 7, 38), new ColisaoB(this.width * 2 + 8, 1, 7, 49), new ColisaoB(this.width * 2 + 13, 2, 10, 38)]
            ]; 
            this.box_menor = [
                [new ColisaoB(0, 1, 5, 27), new ColisaoB(4, 1, 6, 34), new ColisaoB(10, 17, 7, 14)],
                [new ColisaoB(0, 1, 5, 27), new ColisaoB(4, 1, 6, 34), new ColisaoB(10, 17, 7, 14),
                new ColisaoB(this.width, 1, 5, 27), new ColisaoB(this.width + 4, 1, 6, 34), new ColisaoB(this.width + 10, 17, 7, 14)],
                [new ColisaoB(0, 1, 5, 27), new ColisaoB(4, 1, 6, 34), new ColisaoB(10, 17, 7, 14),
                new ColisaoB(this.width, 1, 5, 27), new ColisaoB(this.width + 4, 1, 6, 34), new ColisaoB(this.width + 10, 17, 7, 14),
                new ColisaoB(this.width * 2, 1, 5, 27), new ColisaoB(this.width * 2 + 4, 1, 6, 34), new ColisaoB(this.width * 2 + 10, 17, 7, 14)]
            ]; 
            this.collisionBoxes = this.element.className == "cactoMaior" ? this.box_maior[n - 1] : this.box_menor[n - 1];
            deserto.element.appendChild(this.element);
        }
        mover() {
            this.element.style.left = (parseFloat(this.element.style.left) - velocidade) + 'px';
            return parseInt(this.element.style.left) <= -75;
        }
    }
;

class Dino {
        constructor() {
            this.sprites = {
                'parado': '-669px',
                'pulando': '-713px',
                'correr1': '-757px',
                'correr2': '-801px',
                'morto': '-845px',
                'dinoAgachado': '-933px',
                'trexAgachado2': '-992px',
            };
            this.caixa = {
                ESQUIVAR: [new ColisaoB(1, 1, 55, 25)],
                CORRENDO: [new ColisaoB(22, 31, 18, 16), new ColisaoB(1, 20, 30, 9), new ColisaoB(10, 4, 14, 8), new ColisaoB(1, 28, 29, 5), new ColisaoB(5, 13, 21, 4), new ColisaoB(9, 19, 15, 4)]
            };
            this.collisionBoxes = this.caixa.CORRENDO;
            this.status = 0;
            this.alturaMaxima = 100;
            this.time = 0;
            this.element = document.createElement("div");
            this.element.className = "dino";
            this.element.style.backgroundPositionX = this.sprites.parado;
            this.element.style.bottom = "0px";
            this.element.style.left = "30px";
            this.width = this.status == 0 ? 44: 59;
            this.height = this.status == 0 ? 47 : 29;
            deserto.element.appendChild(this.element);
        }
        corre() {
            dino.status = 0;
            dino.element.className = "dino";
            dino.element.style.backgroundPositionX = dino.sprites.correr1;
            dino.width = 44;
            dino.height = 47;
        }
        abaixa() {
            dino.status = 4;
            dino.element.style.backgroundPositionX = "";
            dino.element.className = "dinoAgachado";
            dino.width = 59;
            dino.height = 29;
        }
        correr() {
            if (this.status == 0) {
                this.collisionBoxes = this.caixa.CORRENDO;
                this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1) ? this.sprites.correr2 : this.sprites.correr1;
            }
            else if (this.status == 1) {
                this.element.style.backgroundPositionX = this.sprites.pulando;
                this.element.style.bottom = (parseFloat(this.element.style.bottom) + 1.2) + "px";
                if (parseInt(this.element.style.bottom) >= this.alturaMaxima)
                    this.status = 2;
            }
            else if (this.status == 2) {
                if (this.time++ > 25) {
                    this.status = 3;
                    this.time = 0;
                }
            }
            else if (this.status == 3) {
                this.element.style.bottom = (parseFloat(this.element.style.bottom) - 1.5) + "px";
                if (parseInt(this.element.style.bottom) <= 0)
                    this.status = 0;
            }
            else if (this.status == 4) {
                this.collisionBoxes = this.caixa.ESQUIVAR;
                this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.dinoAgachado) ? this.sprites.trexAgachado2 : this.sprites.dinoAgachado;
            }
        }
    }
;

class Nuvem {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "nuvem";
            this.element.style.right = "0px";
            this.element.style.top = Math.floor(Math.random() * 120) + "px";
            deserto.element.appendChild(this.element);
        }
        mover() {
            this.element.style.right = (parseFloat(this.element.style.right) + velocidade / 2) + "px";
            return parseInt(this.element.style.right) >= 600;
        }
    }
;


class Ptero {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "pteroD";
            this.sprites = {
                'voar1': '-130px',
                'voar2': '-176px'
            };
            this.element.style.left = "600px";
            var temp = Math.floor(Math.random() * 3) + 1;
            if (temp == 1) {
                this.element.style.bottom = '47px';
            }
            else if (temp == 2) {
                this.element.style.bottom = '29px';
            }
            else {
                this.element.style.bottom = "0px";
            }
            this.collisionBoxes = [
                                    new ColisaoB(15, 20, 16, 5), 
                                    new ColisaoB(18, 13, 24, 6), 
                                    new ColisaoB(2, 23, 4, 3), 
                                    new ColisaoB(6, 23, 4, 7), 
                                    new ColisaoB(10, 23, 6, 9)  ];
            this.width = 46;
            this.height = 40;
            deserto.element.appendChild(this.element);
        }
        mover() {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.voar1) ? this.sprites.voar2 : this.sprites.voar1;
            this.element.style.left = (parseFloat(this.element.style.left) - velocidade) + 'px';
            return parseInt(this.element.style.left) <= -75;
        }
    }
;
function Corre () {
        dino.correr();
        deserto.mover();
        frame = (frame+1)%1000;
        obstaculoTempo = (obstaculoTempo+1)%obstaculoF;

        if (Math.floor(Math.random()*2000) <= PROB_NUVEM) {
            nuvens.push(new Nuvem());
        }
        nuvens.forEach(function (n, i) {
            if(n.mover()) {
                deserto.element.removeChild(nuvens[i].element);
                nuvens.splice(i, 1);
            }
        });
  
        if (obstaculoTempo == 0 && Math.floor(Math.random()*3) <= PROB_NUVEM) {
            if(Math.floor(Math.random()*2) == 0){
                ptero.push(new Ptero());
            }else{
                cacto.push(new Cacto(Math.floor(Math.random()*3)+1));
            }
        }
        cacto.forEach(function (c, i) {
            if(c.mover()){
                deserto.element.removeChild(cacto[i].element);
                cacto.splice(i, 1);
            }
        });
        for(var i=0;i<cacto.length;i++){
            if( EstaQuebrado(dino, cacto[i]) ){
                fimDeJogoF();
                break;
            }
        }

        ptero.forEach(function (p, i) {
            if(p.mover()){
                deserto.element.removeChild(ptero[i].element);
                ptero.splice(i, 1);
            }
        });
        for(var i=0;i<ptero.length;i++){
            if( EstaQuebrado(dino, ptero[i]) ){
                fimDeJogoF();
                break;
            }
        }
        if(frame%30 == 0){
            
            pontuacao.incrementa();
            if(obstaculoF > 200)
                obstaculoF = obstaculoF + (pontuacao.value%100 == 0 ? -5:0);
        }
        if(frame == 0){
            velocidade = velocidade + 0.05;
        }
    };

    function AjudarCaixa(caixa, ajustamento) {
        return new ColisaoB(caixa.x + ajustamento.x, caixa.y + ajustamento.y, caixa.width, caixa.height);
    };

    function CompararCaixa(tRexCaixa, obstaculoCaixa){
        return  tRexCaixa.x < obstaculoCaixa.x + obstaculoCaixa.width &&
                tRexCaixa.x + tRexCaixa.width > obstaculoCaixa.x &&
                tRexCaixa.y < obstaculoCaixa.y + obstaculoCaixa.height &&
                tRexCaixa.height + tRexCaixa.y > obstaculoCaixa.y;
    };

    function EstaQuebrado(objeto1, objeto2){
        var caixa1 = new ColisaoB( parseInt(objeto1.element.style.left), parseInt(objeto1.element.style.bottom), 0, 0);
        var caixa2 = new ColisaoB( parseInt(objeto2.element.style.left), parseInt(objeto2.element.style.bottom), 0, 0);
        for(var i=0;i<objeto1.collisionBoxes.length;i++){
            for(var j=0;j<objeto2.collisionBoxes.length;j++){
                if( CompararCaixa(AjudarCaixa(objeto1.collisionBoxes[i], caixa1), AjudarCaixa(objeto2.collisionBoxes[j], caixa2)) ) {
                    return true;
                }
            }
        }
        return false;
    };
    
    init();
})();