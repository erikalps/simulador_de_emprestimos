import { useState } from 'react'
import './App.css'

import Input from './Componentes/Input'
import Resultado from './Componentes/Resultado';

function App() {
    const [valor, setValor] = useState("");
    const [juros, setJuros] = useState("");
    const [parcelas, setParcelas] = useState("");
    const [mostrarResultado, setMostrarResultado] = useState(false);


    const Calcular=()=>{
      
      setMostrarResultado(true);
    };

  return (
    <div className="app_container">
      <Input valor ={valor} setValor={setValor} juros ={juros} setJuros={setJuros} parcelas={parcelas} setParcelas={setParcelas} Calcular={Calcular}/>
      {mostrarResultado && <Resultado valor={valor} juros={juros} parcelas={parcelas} />}
    </div>
  )
}

export default App
