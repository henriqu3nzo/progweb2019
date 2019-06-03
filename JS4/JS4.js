class IntegerSet{
    constructor(numMaximo){
        this.numMaximo = numMaximo; // Quantidade máxima de elementos do conjunto [0,numMaximo]
        this.valores = []

        for(var i=0; i<numMaximo+1; i++){
            this.valores.push(false);
        }
    }

    inserir(value){
        if(typeof(value) === "number"){
            this.valores[value] = true;
        }
        else{
            value.forEach(element => {
                this.valores[element] = true;  
            });
        }
    }

    remover(value){
        if(typeof(value) === "number"){
            this.valores[value] = false;
        }
        else{
            value.forEach(element => {
                this.valores[element] = false;  
            });
        }
    }

    toString(){
        let setarS = '('
        for(var i=0; i<(this.valores.length)-1; i++){
            if(this.valores[i] == true){
                setarS += (i + ", ");
            }
        }

        if(this.valores[this.numMaximo] == true){
            setarS += (i + ")");
        }else{
            if(setarS.length > 1){setarS = setarS.slice(0,-2) + ")"}
            else{setarS += ")"}
        }
        return setarS
    }

    static uniao(sets){
        let tamanhoMax = sets.sort(function(a,b){
            return a.numMaximo < b.numMaximo;
        })[0].numMaximo
        var setarU = new IntegerSet(tamanhoMax);

        for(let i=0;i<setarU.valores.length;i++){
            let validade = false;
            for(let setInt of sets){
                try{
                    if(setInt.valores[i] == true){
                        validade = true;
                        break;
                    }
                }
                catch{
                    continue;
                }
            }
            if(validade == true){setarU.valores[i]=true}
        }
        return setarU
    } 
    
    static intersecao(sets){
        let tamanhoMax = sets.sort(function(a,b){
            return a.numMaximo < b.numMaximo;
        })[0].numMaximo
        var setarI = new IntegerSet(tamanhoMax);

        for(let i=0;i<setarI.valores.length;i++){
            let validade = true;
            for(let setInt of sets){
                try{
                    if(setInt.valores[i] == true){
                        validade = (validade && true);
                    }
                    else{
                        validade = false;
                        break;
                    }
                }
                catch{
                    validade = false;
                    break;
                }
            }
            if(validade == true){setarI.valores[i]=true}
        }
        return setarI
    }
    
    static diferenca(sets){
        let tamanhoMax = sets.sort(function(a,b){
            return a.numMaximo < b.numMaximo;
        })[0].numMaximo
        var setarD = new IntegerSet(tamanhoMax);

        for(let i=0;i<setarD.valores.length;i++){
            let validade = true;
            for(let setInt of sets){
                try{
                    if(setInt.valores[i] == true){
                        validade = (validade && true);
                    }
                }
                catch{
                    validade = false;
                    break;
                }
            }
            if(validade == true){setarD.valores[i]=true}
        }
        return setarD
    } 
}

setar1 = new IntegerSet(5);       
setar2 = new IntegerSet(7)       
setar3 = new IntegerSet(10)       

setar1.inserir([1,2,5]);          
setar2.inserir([0,1,2,4])         
setar3.inserir([1,2,10,8,5])      

setar3.remover(9)                 

console.log("Conj1: " + setar1.toString())
console.log("Conj2: " + setar2.toString())
console.log("Conj3: " + setar3.toString() + "\n")

console.log("União: " + IntegerSet.uniao([setar1,setar2,setar3]).toString());
console.log("Interseção: " + IntegerSet.intersecao([setar1,setar2,setar3]).toString());
console.log("Diferença: " + IntegerSet.diferenca([setar1,setar2,setar3]).toString());
