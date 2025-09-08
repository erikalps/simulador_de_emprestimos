import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

import Input from './Componentes/Input'
import Resultado from './Componentes/Resultado';

function App() {
    const [valor, setValor] = useState("");
    const [juros, setJuros] = useState("");
    const [parcelas, setParcelas] = useState("");
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const[moeda, setMoeda] = useState("BRL");
    const [taxaCambio, setTaxaCambio] = useState(1); // padrão 1 para real
   
   
    const Calcular=()=>{
      
      setMostrarResultado(true);
    };


    useEffect(()=>{
      if(moeda === "BRL"){
        return;
      }

      fetch('https://v6.exchangerate-api.com/v6/d6b301c4fe72097e88154027/latest/USD') // buscando
        .then((res)=>res.json()) //transformando o retorno em json
        .then(
          (dados)=>{
          setTaxaCambio(dados.conversion_rates[moeda]);
        })

  
    })

  return (
    
    <div>
      <h1>Simulador de Emprestimos</h1>
      <Input valor ={valor} setValor={setValor} juros ={juros} setJuros={setJuros} parcelas={parcelas} setParcelas={setParcelas} Calcular={Calcular} moeda={moeda} setMoeda={setMoeda}/>
      {mostrarResultado && <Resultado valor={valor} juros={juros} parcelas={parcelas} taxaCambio={taxaCambio} moeda={moeda}/>}
    </div>
  )
}

export default App
