function VezMaquina() { 
	var x = Math.floor((Math.random()*3) + 1);  
	return x; 
}

jogadorP = false;
round = 0;
dicionario = []; 
dicionario[1] = "papel"; 
dicionario[2] = "pedra"; 
dicionario[3] = "tesoura"; 


while(jogadorP  == false) { 
	var jogadaPlayer = parseInt(prompt("Escolha sua jogada:\n 1 - Papel\n2 - Pedra\n3 - Tesoura"));
	var jogadaCpu = VezMaquina(); 	
	if(jogadaPlayer == 1 && jogadaCpu == 2) { //player joga papel e cpu joga pedra 
		console.log("O computador jogou pedra\nVoce ganhou!"); 
		round++; 
	}

	else if(jogadaPlayer == 2 && jogadaCpu == 3) {  //player joga pedra e cpu joga tesoura
		console.log("O computador jogou tesoura\nVoce ganhou!")
		round++; 
	}	

	else if(jogadaPlayer == 3 && jogadaCpu == 1) { //player joga tesoura cpu joga papel
		console.log("O computador jogou papel\nVoce ganhou!"); 
		round++; 
	}
	else if(jogadaPlayer === jogadaCpu) { 
		console.log("O computador jogou "+ dicionario[jogadaCpu] + "\nA rodada empatou!"); 
	}

	else { 
		console.log("O computador jogou "+ dicionario[jogadaCpu] + "\nVoce perdeu! a sua pontuacao foi de " + rodada); 	
		jogadorP  = true;
	}	

}


