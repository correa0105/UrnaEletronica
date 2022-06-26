let yourVote = document.querySelector(".yourVote");                     //ARMAZENA A QUERY DO "SEU VOTO PARA"
let office = document.querySelector(".voteType");                       //ARMAZENA A QUERY DO "CARGO DO VOTO"
let descritionVote = document.querySelector(".informationsVote");       //ARMAZENA A QUERY DAS INFORMÇÕES
let legend = document.querySelector(".legend");                         //ARMAZENA A QUERY DA LEGENDA
let containerImg = document.querySelector(".img-grid");                 //ARMAZENA A QUERY DAS IMAGENS
let inputGrid = document.querySelector(".inputGrid");                   //ARMAZENA A QUERY DA GRID DE INPUTS
let buttons = document.querySelector(".keyboards");                     //ARMAZENA A QUERY DOS BOTÕES

let currentStage = 0;                                                   //DEFINE O ESÁGIO EM 0
let numberCandidate = "";                                               //NUMERO DO CANDIDATO EM 0
let statusWhite = false;                                                //STATUS DO BRANCO PARA FALSE

function start() {                                                      //INICIA A FUNÇÃO START
    let stage = stages[currentStage];                                   //CRIA VARIAVEL STAGE QUE ARMAZENA O OBJETO STAGIO NO INDICE 0
    
    numberCandidate = "";                                               //ZERA O NUMERO DO CANDIDATO SEMPRE QUE INICIA O PROGRAMA

    let qntdInputs = "";                                                //CRIA VARIAVEL DE QUANTIDADE DE INPUTS

    for (let i = 0; i < stage.numbers; i++) {                           //CRIA UM FOR PARA DETERMINAR A QUANTIDADE DE INPUTS
        if (i === 0) {                                                  //O PRIMEIRO INPUT TERA A CLASSE FLASHING
            qntdInputs += '<input class="inputItem flashing"></input>'; //INCLUE O CÓDIGO NA VARIAVEL DE QUANTIDADE DE INPUTS
        } else {                                                        //O RESTANTE SERA APENAS A VARIAVEL INPUT ITEM
            qntdInputs += '<input class="inputItem"></input>';          //INCLUI O CODIGO NA VARIAVEL DE QUANTIDADE DE INPUTS
        }
    }

    inputGrid.innerHTML = qntdInputs;                                   //A GRID DE INPUTS RECEBE O CÓDIGO NO SEU HTML QUE ESTA DIGITADO DENTRO DA VARIAVEL

    yourVote.style.display = "none";                                    //"SEU VOTO PARA:" FICA INVISIVEL
    legend.style.display = "none";                                      //A LEGENDA FICA INVISIVEL

    containerImg.innerHTML = "";                                        //O CONTAINER DE IMAGEM FICA VAZIO
    descritionVote.innerHTML = "";                                      //A DESCRIÇÃO DO CANDIDATO FICA VAZIO

    office.innerHTML = stage.title;                                     //O CARGO RECEBE A O TITULO DO OBJETO DE ACORDO COM O ESTAGIO ATUAL

    btnClick();                                                         //CHAMA A FUNÇÃO DE CAPTURA DE CLICK DE BOTAO
}

function start2() {
    let stage = stages[currentStage];                                   //CRIA VARIAVEL STAGE QUE ARMAZENA O OBJETO STAGIO NO INDICE 0
    
    numberCandidate = "";                                               //ZERA O NUMERO DO CANDIDATO SEMPRE QUE INICIA O PROGRAMA

    let qntdInputs = "";                                                //CRIA VARIAVEL DE QUANTIDADE DE INPUTS

    for (let i = 0; i < stage.numbers; i++) {                           //CRIA UM FOR PARA DETERMINAR A QUANTIDADE DE INPUTS
        if (i === 0) {                                                  //O PRIMEIRO INPUT TERA A CLASSE FLASHING
            qntdInputs += '<input class="inputItem flashing"></input>'; //INCLUE O CÓDIGO NA VARIAVEL DE QUANTIDADE DE INPUTS
        } else {                                                        //O RESTANTE SERA APENAS A VARIAVEL INPUT ITEM
            qntdInputs += '<input class="inputItem"></input>';          //INCLUI O CODIGO NA VARIAVEL DE QUANTIDADE DE INPUTS
        }
    }

    inputGrid.innerHTML = qntdInputs;                                   //A GRID DE INPUTS RECEBE O CÓDIGO NO SEU HTML QUE ESTA DIGITADO DENTRO DA VARIAVEL

    yourVote.style.display = "none";                                    //"SEU VOTO PARA:" FICA INVISIVEL
    legend.style.display = "none";                                      //A LEGENDA FICA INVISIVEL

    containerImg.innerHTML = "";                                        //O CONTAINER DE IMAGEM FICA VAZIO
    descritionVote.innerHTML = "";                                      //A DESCRIÇÃO DO CANDIDATO FICA VASIO

    office.innerHTML = stage.title;                                     //O CARGO RECEBE A O TITULO DO OBJETO DE ACORDO COM O ESTAGIO ATUAL
}

function attInterface() {                                               //FUNÇÃO PARA ATUALIZAR DADOS NA INTERFACE
    let stage = stages[currentStage];                                   //CRIA VARIAVEL STAGE QUE ARMAZENA O OBJETO STAGIO NO INDICE 0
    let candidate = stage.candidates.filter((item) => {                 //CRIA UMA VARIAVEL QUE ARMAZENA TODOS OS CANDIDATOS E CRIA UMA FUNÇÃO FILTER QUE RECEBE O VALOR ITEM
        if(item.number === numberCandidate) {                           //SE O ITEM NUMBER FOR IGUAL AO NUMERO DO CANDIDATO RETORNA O ITEM
            return item.number;
        } else {
            return false;                                               //SE NÃO FOR RETORNA FALSO
        }
    });

    if(candidate.length > 0) {                                          //SE OS NUMEROS DO CANDIDATO FOR MAIOR QUE 0
        candidate = candidate[0];                                       //ELE ARMAZENA O INDICE 0 DO 0BJETO ENCONTRADO QUE É O OBJETO ENCONTRADO
        yourVote.style.display = "block";                               //DA VISIBILIDADE PARA O "SEU VO PARA"
        legend.style.display = "block";                                 //DA VISIBILIDADE PARA A LEGENDA

        if (currentStage === 0) {
            descritionVote.innerHTML = `<p>NOME: ${candidate.name}</p><p>PARTIDO: ${candidate.match}</p>`;    //A DESCRIÇÃO RECEBE UM P COM NOME UM P COM PARTIDO E COM PARTIDO;
        } else {
            descritionVote.innerHTML = `<p>NOME: ${candidate.name}</p><p>PARTIDO: ${candidate.match}</p><p>VICE-PREFEITO: ${candidate.vice}</p>`;   //A DESCRIÇÃO RECEBE UM P COM NOME UM P COM PARTIDO E COM PARTIDO;
        }

        let photos = "";                                                //CRIA UMA VARIAVEL PHOTOS QUE ARMAZENA VALOR VAZIO
        for (let i in candidate.photo) {                                //CRIA UM FOR QUE VAI ITERAR SOBRE SOBRE O ATRIBUTO PHOTO DO OBJETO
            if (candidate.photo[i].small === true) {
                photos += `<div class="img-vice-candidate"><img src="${candidate.photo[i].url}" alt=""><h2>${candidate.photo[i].legend}</h2></div>`;
            } else {
                photos += `<div class="img-candidate"><img src="${candidate.photo[i].url}" alt=""><h2>${candidate.photo[i].legend}</h2></div>`;  //QUANDO ELE ENCONTRAR ELE SALVA UM CÓDIGO HTML DENTRO DA VARIALVE PHOTOS
            }
        }

        containerImg.innerHTML = photos;                                //ARMAZENA O CÓDIGO HTML DENTRO DO CONTAINER DE IMG

    } else {                                                            //SE OS NUMEROS NÃO FOREM MAIOR QUE 0
        yourVote.style.display = "block";                               //DA VISIBILIDADE PARA O "SEU VO PARA"             
        legend.style.display = "block";                                 //DA VISIBILIDADE PARA A LEGENDA
        descritionVote.innerHTML = '<div class="null-vote flashing">VOTO NULO</div>';  //EXIBE A DESCRIÇÃO COM UMA DIV ESCRITA VOTO NULO
    }
}

function caracterToDisplay(value) {                                     //CRIA FUNÇÃO QUE ENVIA O BOTAO CLICADO PARA O DISPLAY
    let inputList = document.querySelector(".inputItem.flashing");      //CRIA VARIAVEL QUE ARMAZENA O O ITEM QUE TENHA A CLASSE INPUTITEM E A CLASSE FLASHING

    if(inputList !== null) {                                            //SE O INPUTLIST FOR DIFERENTE DE NULO
        inputList.value = value;                                        //RECEBE O VALOR VALUE QUE ESTA COMO DADO DA FUNÇÃO
        numberCandidate += value;                                       //CONCATENA O DADO DA FUNÇÃO AO NUMERO DO CANDIDATO

        inputList.classList.remove("flashing");                         //REMOVE A CLASSE FLASHING DE DENTRO DO
        if(inputList.nextElementSibling !== null) {                     //SE O PROXIMO ELEMENTO FOR DIFERENTE DE NULO
            inputList.nextElementSibling.classList.add("flashing");     //ELE ADICIONA A CLASSE FLASHING NO PROXIMO ELEMENTO
        } else {
            attInterface();                                             //SE NÃO ELE CHAMA A FUNÇÃO INTERFACE
        }
    }
}

function btnClick() {
    buttons.addEventListener("click", event => {
        const element = event.target;

        if (element.classList.contains("keyboard-number")) {
            caracterToDisplay(element.innerHTML);
        }
        if (element.classList.contains("reset")) {
            clean();
        }
        if (element.classList.contains("white")) {
            white();
        }
        if (element.classList.contains("confirm")) {
            confirmVote();
        }
    })
}

function white() {
    if(numberCandidate === "") {
        statusWhite = true;
        yourVote.style.display = "block";
        legend.style.display = "block";
        inputGrid.innerHTML = "";
        descritionVote.innerHTML = '<div class="null-vote flashing">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em BRANCO você deve primeiro corrigir.")
    }
}

function clean() {
    if(descritionVote.innerHTML != '<div class="end flashing">FIM</div>'){
        start2();
    } else {
        alert("VOCÊ JA FINALIZOU SEU VOTO!");
    }
}

function confirmVote() {
    let stage = stages[currentStage];

    let confirmedVote = false;

    if(statusWhite === true) {
        confirmedVote = true;
    } else if (numberCandidate.length === stage.numbers) {
        confirmedVote = true;
    }

    if(confirmedVote === true) {
        currentStage++;
        if(stages[currentStage] !== undefined) {
            start2();
        } else {
            inputGrid.innerHTML = "";                                //A GRID DE INPUTS RECEBE VALOR VAZIO

            yourVote.style.display = "none";                         //"SEU VOTO PARA:" FICA INVISIVEL
            legend.style.display = "none";                           //A LEGENDA FICA INVISIVEL
        
            containerImg.innerHTML = "";                             //O CONTAINER DE IMAGEM FICA VAZIO
            descritionVote.innerHTML = "";                           //A DESCRIÇÃO DO CANDIDATO FICA VASIO
            office.innerHTML = "";                                   //O CARGO DO CANDIDATO FICA VAZIO
            
            descritionVote.innerHTML = '<div class="end flashing">FIM</div>';
        }
    } else {
        alert("Você deve preencher todos os campos, para passar para proxima etapa!");
    }
}

start();