//https://www.youtube.com/watch?v=nDSBftG1W6Y&list=PLWXw8Gu52TRKouXUo3Abu33_ODPXZTz64&index=29
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto tarefa
  const tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    status: ''
  }

  // use state
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [tarefas, settarefas] = useState([]);
  const [objtarefa, setObjtarefa] = useState(tarefa);
 
  // use effect
  useEffect(() => {
    fetch('http://localhost:8080/tarefas')
      .then(retorno => retorno.json())
      .then(retorno_convertido => settarefas(retorno_convertido))
  }, [])

  // obtendo os dados do formulario
  const aoDigitar = (e) => {
    //console.log(e.target);
    setObjtarefa({ ...objtarefa, [e.target.name]: e.target.value });
  }
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //cadastrar tarefa 
  const cadastrar = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/tarefas', {
      method: 'post',
      body: JSON.stringify(objtarefa),
      headers: {
        'Content-type': 'application/json',
      }
    });

    const data = await response.json()

    if (response.ok) {
      settarefas([...tarefas, data]);
      alert('tarefa cadastrado com sucesso')
      limparFormulario();
    } else {
      alert("(Bad Resquest = " + data.status + " Data hora = " + data.timestamp + " Erros = " + data.message)
      limparFormulario();
    }

  }; // fim post
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //alterar tarefa 
  const alterar = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/tarefas/' + objtarefa.id, {
      method: 'put',
      body: JSON.stringify(objtarefa),
      headers: {
        'Content-type': 'application/json',
      }
    });

    const data = await response.json()

    if (response.ok) {
      // mensagem
      alert('tarefa alterada com sucesso');
      // copiar do vetor de tarefas
      let vetorTemp = [...tarefas];
      // indice
      let indice = vetorTemp.findIndex((tarefa) => {
        return tarefa.id === objtarefa.id;
      });
      // alterar tarefa do vetor temp
      vetorTemp[indice] = objtarefa;
      // atualizar o vetor de tarefas
      settarefas(vetorTemp);
      // limpar formulario
      limparFormulario();
    } else {
      alert("(Bad Resquest = " + data.status + " Data hora = " + data.timestamp + " Erros = " + data.message)
      limparFormulario()
    }
  }
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  // remover tarefa
  const remover = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/tarefas/' + objtarefa.id, {
      method: 'delete',
    });

    
    if (response.ok) {
      console.log('passou aq 03 = '+response.text.toString)
      // mensagem 
      alert('tarefa excluida com sucesso');
      // copiar do vetor de tarefas
      let vetorTemp = [...tarefas];
      // indice
      let indice = vetorTemp.findIndex((tarefa) => {
        return tarefa.id === objtarefa.id;
      });
      // remover tarefa do vetor temp
      vetorTemp.splice(indice, 1);
      // atualizar o vetor de tarefas
      settarefas(vetorTemp);
      // limpar formulario 
      limparFormulario();

    } else {
      const data = await response.json()
      alert("(Bad Resquest = " + data.status + " Data hora = " + data.timestamp + " Erros = " + data.message)
      limparFormulario();
    }
  }// fim remover

  // limpar formulario
  const limparFormulario = () => {
    setObjtarefa(tarefa);
    setBtnCadastrar(true);
  }

  //selecionar tarefa
  const selecionartarefa = (indice) => {
    setObjtarefa(tarefas[indice]);
    setBtnCadastrar(false);
  }

  // retorno
  return (
    <div>
      <Formulario botao={btnCadastrar}
        eventoTeclado={aoDigitar} cadastrar={cadastrar}
        obj={objtarefa} cancelar={limparFormulario}
        remover={remover} alterar={alterar} />

      <Tabela vetor={tarefas} selecionar={selecionartarefa} />
    </div>
  );
}

export default App;
