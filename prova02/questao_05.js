class Venda{
    constructor(id,quantidade,preco){
        this.id = id;
        this.quantidade = quantidade;
        this.preco = preco;
    }
    getID(){
        return this.id;
    }
    
    setID(id){
        this.id=id;
    }
    
    getQuantidade(){
        return this.quantidade;
    }
    
    setQuantidade(v){
        this.quantidade =v;
    }
    
     getPreco(){
        return this.preco;
    }
      
    setPreco(v){
        this.preco=v;
    }
    
    getValorTotal(){
        return this.quantidade * this.preco;
    }
}
    
     var venda = new Venda('id=3',10,12.61);
     var venda2 = new Venda('id=8',15,3.56);

     console.log(venda.getValorTotal())
     console.log(venda2.getValorTotal())