const start = () => {
    let letrasUsadas = [],
        categoria,
        palavra,
        tentativasRestantes = document.getElementsByClassName('hidden').length,
        letrasNaoDescobertas,
        fimDeJogo = false ;
        
    categoria = getCategoria();
    document.getElementById("categoria").innerHTML = categoria;
    document.getElementById("letasUsadas").innerHTML = "";
    palavra = getPalavra(categoria);
    letrasNaoDescobertas = palavra.replaceAll("-",'').replaceAll(" ",'').length;

    getCaracteres(palavra);

    document.addEventListener('keypress',function (event){
        const letra = event.key,
              entradasValidas = "abcdefghijklmnopqrstuvwxyz",
              info = document.getElementById("info");

        let acertos;
        console.log('Evento disparado...');
        if(letrasUsadas.indexOf(letra) == -1 && !fimDeJogo && entradasValidas.indexOf(letra) > -1)
        {
            console.log('Jogada válida');
            acertos  = revelaLetra(letra, palavra);
            console.log('Acertos: ' + acertos)
            letrasNaoDescobertas-= acertos;

            setLetrasUsadas(letra);
           
            if( acertos == 0)
            {
                console.log('Errou');
              tentativasRestantes =  revelaBoneco();
            }

            letrasUsadas.push(letra);

        }

        fimDeJogo = validaFimDeJogo(letrasNaoDescobertas, tentativasRestantes, palavra);      
       
    });
    
};

const validaVitoria = (letrasNaoDescobertas, tentativasRestantes) => {
    return letrasNaoDescobertas == 0 && tentativasRestantes > 0;
};

const validaFimDeJogo = (letrasNaoDescobertas, tentativasRestantes, palavra) => {
    console.log("Validando Fim de jogo...");
    const fim = letrasNaoDescobertas == 0 || tentativasRestantes == 0;
    console.log(fim, letrasNaoDescobertas, tentativasRestantes);
    if(fim){
        if(validaVitoria(letrasNaoDescobertas, tentativasRestantes)){
            console.log('venceu...');
            info.innerText = "Você venceu, pressione F5 para uma nova partida";
            info.style.color = "green";
        }

        if(!validaVitoria(letrasNaoDescobertas, tentativasRestantes))
        {
            revelaPalavra(palavra);
            console.log("Perdeu!...");
            info.innerText = "Você perdeu, pressione F5 para uma nova partida";
            info.style.color = "red";
        }
    }
    return fim;
};

const revelaPalavra = (palavra) => {
    for(var i in palavra)
    {
        revelaLetra(palavra[i].toLocaleLowerCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g,""), palavra);
    }
}

const setLetrasUsadas = letra => {
    const letrasUsadas = document.getElementById('letasUsadas');
    let span = document.createElement('span');
    span.classList.add('letraRevelada');
    span.appendChild(document.createTextNode(letra.toLocaleUpperCase()));
    letrasUsadas.appendChild(span);
};

const revelaBoneco = () => {
    const bonecoPartes = document.getElementsByClassName('hidden');
    if(bonecoPartes.length > 0)
    {
        bonecoPartes[0].classList.remove('hidden');
    }
    return bonecoPartes.length;
};

const revelaLetra = (letra, palavra) => {
    let acertos = 0

    for(let i in palavra)
    {
        if(letra.toLocaleLowerCase() == palavra[i].toLocaleLowerCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g,""))
        {
            document.getElementById('span'+i).innerText = palavra[i];
            acertos ++;
        }
    }

    return acertos;
}

const getCaracteres = palavra => {
    const palavraArea = document.getElementById("plavraArea");
    palavraArea.innerHTML = '';
    let elemento;
    for(let i = 0; i<palavra.length; i++)
    {
        elemento = document.createElement('span');
        elemento.appendChild(document.createTextNode((palavra[i] == " "  || palavra[i] == "-" ? palavra[i] : "_")));
        elemento.setAttribute('id', 'span'+i);
        elemento.classList.add('caractere');
        palavraArea.append(elemento);
    }
    
    
};

const getCategoria = () => {
    let categorias = [];

    for(let categoria in palavras)
    {

        categorias.push(categoria);
    }

   
    return categorias[Math.floor(Math.random() * categorias.length)];
};

const getPalavra =  categoria => {
    let arrayPalavras = palavras[categoria];
    
    return arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];
};