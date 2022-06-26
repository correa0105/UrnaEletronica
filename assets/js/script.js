let yourVote = document.querySelector(".yourVote");
let office = document.querySelector(".voteType");
let descritionVote = document.querySelector(".informationsVote");
let legend = document.querySelector(".legend");
let containerImg = document.querySelector(".img-grid");
let inputGrid = document.querySelector(".inputGrid");
let buttons = document.querySelector(".keyboards");

let currentStage = 0;
let numberCandidate = "";
let statusWhite = false;

function start() {                                                           //FUNÇÃO DE INICIAR O PROGRAMA COM O EVENTO DE BOTAO CLICK
    let stage = stages[currentStage];
    
    numberCandidate = "";

    let qntdInputs = "";

    for (let i = 0; i < stage.numbers; i++) {
        if (i === 0) {
            qntdInputs += '<input class="inputItem flashing"></input>';
        } else {
            qntdInputs += '<input class="inputItem"></input>';
        }
    }

    inputGrid.innerHTML = qntdInputs;

    yourVote.style.display = "none";
    legend.style.display = "none";

    containerImg.innerHTML = "";
    descritionVote.innerHTML = "";

    office.innerHTML = stage.title;

    btnClick();
}

function start2() {                                                          //FUNÇÃO DE INICIAR O PROGRAMA SEM O EVENTO DE BOTÃO CLICK
    let stage = stages[currentStage];
    
    numberCandidate = "";

    let qntdInputs = "";

    for (let i = 0; i < stage.numbers; i++) {
        if (i === 0) {
            qntdInputs += '<input class="inputItem flashing"></input>';
        } else {
            qntdInputs += '<input class="inputItem"></input>';
        }
    }

    inputGrid.innerHTML = qntdInputs;

    yourVote.style.display = "none";
    legend.style.display = "none";

    containerImg.innerHTML = "";
    descritionVote.innerHTML = "";

    office.innerHTML = stage.title;
}

function attInterface() {                                                    //FUNÇÃO PARA ATUALIZAR A INTERFACE
    let stage = stages[currentStage];
    let candidate = stage.candidates.filter((item) => {
        if(item.number === numberCandidate) {
            return item.number;
        } else {
            return false;
        }
    });

    if(candidate.length > 0) {
        candidate = candidate[0];
        yourVote.style.display = "block";
        legend.style.display = "block";

        if (currentStage === 0) {
            descritionVote.innerHTML = `<p>NOME: ${candidate.name}</p><p>PARTIDO: ${candidate.match}</p>`;
        } else {
            descritionVote.innerHTML = `<p>NOME: ${candidate.name}</p><p>PARTIDO: ${candidate.match}</p><p>VICE-PREFEITO: ${candidate.vice}</p>`;
        }

        let photos = "";
        for (let i in candidate.photo) {
            if (candidate.photo[i].small === true) {
                photos += `<div class="img-vice-candidate"><img src="${candidate.photo[i].url}" alt=""><h2>${candidate.photo[i].legend}</h2></div>`;
            } else {
                photos += `<div class="img-candidate"><img src="${candidate.photo[i].url}" alt=""><h2>${candidate.photo[i].legend}</h2></div>`;
            }
        }

        containerImg.innerHTML = photos;

    } else {
        yourVote.style.display = "block";        
        legend.style.display = "block";
        descritionVote.innerHTML = '<div class="null-vote flashing">VOTO NULO</div>';
    }
}

function caracterToDisplay(value) {                                          //FUNÇÃO PARA ENVIAR O DADO PARA O DISPLAY          
    let inputList = document.querySelector(".inputItem.flashing");

    if(inputList !== null) {
        inputList.value = value;
        numberCandidate += value;

        inputList.classList.remove("flashing");
        if(inputList.nextElementSibling !== null) {
            inputList.nextElementSibling.classList.add("flashing");
        } else {
            attInterface()
        }
    }
}

function btnClick() {                                                        //FUNÇÃO DE CAPTURA DE EVENTO, CHAMA A FUNÇÃO DE ACORDO COM O BOTAO CLICADO
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

function white() {                                                           //FUNÇÃO PARA CLICAR EM BRANCO
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

function clean() {                                                           //FUNÇÃO PARA LIMPAR O INPUT E A VARIAVEL DE CANDIDATO
    if(descritionVote.innerHTML != '<div class="end flashing">FIM</div>'){
        start2();
    } else {
        alert("VOCÊ JA FINALIZOU SEU VOTO!");
    }
}

function confirmVote() {                                                     //FUNÇÃO DE CONFIRMAR O VOTO
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
            inputGrid.innerHTML = "";

            yourVote.style.display = "none";
            legend.style.display = "none";
        
            containerImg.innerHTML = "";
            descritionVote.innerHTML = "";
            office.innerHTML = "";
            
            descritionVote.innerHTML = '<div class="end flashing">FIM</div>';
        }
    } else {
        alert("Você deve preencher todos os campos, para passar para proxima etapa!");
    }
}

start();