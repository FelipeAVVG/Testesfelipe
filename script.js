let cronometro;
let voltas = [];
let voltaNumero = 1;
let tempoInicio;

function formatarTempo(tempo) {
    const horas = Math.floor(tempo / 3600000);
    const minutos = Math.floor((tempo % 3600000) / 60000);
    const segundos = Math.floor((tempo % 60000) / 1000);
    const milissegundos = Math.floor(tempo % 1000);

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milissegundos.toString().padStart(3, '0')}`;
}

function iniciarCronometro() {
    tempoInicio = new Date().getTime();
    cronometro = setInterval(atualizarCronometro, 10);
}

function atualizarCronometro() {
    const tempoAtual = new Date().getTime();
    const tempoPassado = tempoAtual - tempoInicio;

    document.getElementById("cronometro").innerText = formatarTempo(tempoPassado);
}

function registrarVolta() {
    const numeroAtleta = document.getElementById("numeroAtleta").value;
    const nomeAtleta = document.getElementById("nomeAtleta").value;
    const categoriaAtleta = document.getElementById("categoriaAtleta").value;

    if (!numeroAtleta || !nomeAtleta || !categoriaAtleta) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const tempoAtual = new Date().getTime();
    const tempoPassado = tempoAtual - tempoInicio;

    // Verificar se já existe um objeto para o atleta
    let atleta = voltas.find(a => a.numero === numeroAtleta);

    // Se não existe, criar um novo objeto atleta
    if (!atleta) {
        atleta = { numero: numeroAtleta, nome: nomeAtleta, categoria: categoriaAtleta, voltas: [] };
        voltas.push(atleta);
    }

    // Adicionar a volta ao objeto atleta
    atleta.voltas.push({ volta: voltaNumero, tempo: tempoPassado });

    // Atualizar a tabela com os dados das voltas
    atualizarTabelaVoltas();

    voltaNumero++;
}

function pararCronometro() {
    clearInterval(cronometro);
}

function resetarCronometro() {
    clearInterval(cronometro);
    document.getElementById("cronometro").innerText = "00:00:00:000";
    voltas = [];
    voltaNumero = 1;
    document.getElementById("dados-voltas").innerHTML = "";
}

function atualizarTabelaVoltas() {
    const tabela = document.getElementById("dados-voltas");
    tabela.innerHTML = '';

    voltas.forEach(atleta => {
        atleta.voltas.forEach(volta => {
            const novaLinha = tabela.insertRow();
            const celulaNumeroAtleta = novaLinha.insertCell(0);
            const celulaNomeAtleta = novaLinha.insertCell(1);
            const celulaCategoriaAtleta = novaLinha.insertCell(2);
            const celulaVolta = novaLinha.insertCell(3);
            const celulaTempo = novaLinha.insertCell(4);

            celulaNumeroAtleta.innerText = atleta.numero;
            celulaNomeAtleta.innerText = atleta.nome;
            celulaCategoriaAtleta.innerText = atleta.categoria;
            celulaVolta.innerText = volta.volta;
            celulaTempo.innerText = formatarTempo(volta.tempo);
        });
    });
}

