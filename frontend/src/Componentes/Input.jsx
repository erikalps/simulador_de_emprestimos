import React  from "react";
import { useState } from "react";
import "./Input.css";


const Input=({valor, setValor, juros, setJuros, parcelas, setParcelas, Calcular, moeda, setMoeda})=>{




    return(
        <form className="input_form" onSubmit={(e) => e.preventDefault()}>
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

             <select value={moeda} onChange={(e)=>setMoeda(e.target.value)}>
                 <option value="BRL">Real (BRL)</option>
                 <option value="USD">Dólar (USD)</option>
                 <option value="EUR">Euro (EUR)</option>
             </select>
             <button type="button" onClick={Calcular}>Calcular</button>

        </form>
    )
};

export default Input;
