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
    const [taxaCambio, setTaxaCambio] = useState({
    conversion_rates: { BRL: 1, USD: 0.20, EUR: 0.18 }
});
 
   
   
    const Calcular=()=>{
      
      setMostrarResultado(true);
    };


 useEffect(()=>{
  fetch('https://v6.exchangerate-api.com/v6/8889239bc149de88363489fc/latest/BRL')
    .then((res)=>res.json())
    .then((dados)=>{
    
    if(dados && dados.conversation_rates){
       setTaxaCambio(dados);
    } 

     
    })
    
}, []) 

  return (
    
    <div>
      <h1>Simulador de Emprestimos</h1>
      <Input valor ={valor} setValor={setValor} juros ={juros} setJuros={setJuros} parcelas={parcelas} setParcelas={setParcelas} Calcular={Calcular} />
      {mostrarResultado && <Resultado valor={valor} juros={juros} parcelas={parcelas} taxaCambio={taxaCambio}/>}
    </div>
  )
}

export default App
