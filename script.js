const fetchGETAlunos = async () => {
    try {
        let resposta = await fetch('http://localhost:3000/users');
        resposta = await resposta.json();
        return resposta;
    } catch (e) {
        console.error(e);
    }
};

const enviarAluno = async () => {
    const nome = document.querySelector("#novo-nome").value;
    const idade = document.querySelector("#novo-idade").value;
    const feedback = document.querySelector('#feedback');

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: { nome, idade, idiomas: ["pt-BR"] }})
        }
        let resposta = await fetch('http://localhost:3000/users', options);
        resposta = await resposta.json();
        feedback.textContent = resposta;

    } catch (e) {
        console.error(e);
    }
}

const removerAluno = async (event) => {
    const id = event.target.dataset.id;
    try {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        });
        event.target.parentElement.remove();
    } catch (e) {
        console.error(e);
    }
};

const main = async () => {
    const alunos = await fetchGETAlunos();
    const elemUl = document.querySelector('#lista-alunos');

    for (let aluno of alunos) {
        console.log(aluno);
        const elemLi = document.createElement('li');

        const idiomas = aluno.idiomas ? aluno.idiomas : 'Não foram encontrados idiomas';

        elemLi.innerHTML = `Nome: ${aluno.nome} - Idade: ${aluno.idade} - Idiomas: ${idiomas}`;
        const btRemover = document.createElement('button');
        btRemover.dataset.id = aluno._id;
        btRemover.textContent = '❌';
        btRemover.onclick = removerAluno;

        elemLi.appendChild(btRemover);
        elemUl.appendChild(elemLi);
    }
}

const botaoEnviar = document.querySelector('#enviar');
main()

botaoEnviar.addEventListener('click', enviarAluno);
// botaoEnviar.addEventListener('click', async () => {
//     const nome = document.querySelector("#novo-nome").value;
//     const idade = document.querySelector("#novo-idade").value;
//     const feedback = document.querySelector('#feedback');

//     const body = { user: { nome, idade } };
    
//     try {
//         const options = {
//             method: 'POST',
//             body: Object.keys(body)
//             .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
//             .join('&'),
//             headers: {
//                 "Access-Control-Allow-Origin": "http://localhost:3000/"
//             }
//         }
//         console.log(options);
//         let resposta = await fetch('http://localhost:3000/users', options);
//         resposta = await resposta.json();
//         feedback.innerHTML = resposta;
//         console.log(resposta);


//     } catch (e) {
//         console.error(e);
//     }
// });