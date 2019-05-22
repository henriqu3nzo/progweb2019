function Contador(numero){
    var auxiliar = numero;
    function N(){
        auxiliar++;
        return auxiliar;
    }

    return N;
}

var incrementar = Contador(1);
console.log("Primeira chamada", incrementar());
console.log("Segunda chamada", incrementar());
console.log("Terceira chamada", incrementar());