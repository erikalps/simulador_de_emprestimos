import React  from "react";
import { useState } from "react";
import "./Input.css";


const Input=({valor, setValor, juros, setJuros, parcelas, setParcelas, Calcular})=>{
    

    return(
        <form className="input_form">
             <h1>Simulador de Emprestimos</h1>
      
            <input 
                type="number"
                placeholder="Valor:"
                value={valor}
                onChange={(e)=>setValor(e.target.value)}


            />
            <input 
                type="number"
                placeholder="Taxa de juros:" 
                value={juros}
                onChange={(e)=>setJuros(e.target.value)}
                />
            <input 
                type="number"
                placeholder="Numero de parcelas:" 
                value={parcelas}
                onChange={(e)=>setParcelas(e.target.value)}
                
             />

             <button type="button" onClick={Calcular}>Calcular</button>

        </form>
    )
};

export default Input;
