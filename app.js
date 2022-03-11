'use strict';

/*let bancoDeDados = [
    {'tarefa': 'Estudar', 'status':''},
    {'tarefa': 'Amassar newba', 'status':''},
]*/



const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (bancoDeDados) => localStorage.setItem('todoList', JSON.stringify(bancoDeDados));


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas();
    const bancoDeDados = getBanco();
    bancoDeDados.forEach( (item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        const bancoDeDados = getBanco();
        bancoDeDados.push({'tarefa': texto, 'status': ''});
        setBanco(bancoDeDados);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const bancoDeDados = getBanco();
    bancoDeDados.splice(indice, 1);
    setBanco(bancoDeDados);
    atualizarTela();
}

const atualizarItem = (indice) =>{
    const bancoDeDados = getBanco();
    bancoDeDados[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(bancoDeDados);
    atualizarTela();
}

const clickItem = (evento) =>{
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();