import React  from "react";
import { useState } from "react";
const Input=({valor, setValor, juros, setJuros, parcelas, setParcelas, Calcular})=>{
    

    return(
        <form>
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
