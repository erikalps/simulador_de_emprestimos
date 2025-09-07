import React from "react";
import "./Resultado.css"
const Resultado =({valor, juros, parcelas})=>{
    
    if(!valor || !juros || !parcelas) return null;
    
   const valorParcela = (Number(valor) * (1 + Number(juros) / 100)) / Number(parcelas);
  const valorTotal = Number(valor) * (1 + Number(juros) / 100);

    
    return(
         <div className="resultado">
            <h2>Simulação Realizada</h2>
            <div>
                <p className="resultado_p">Emprestimo: {Number(valor).toFixed(2)}</p>
                <p className="resultado_p">Juros: {Number(juros).toFixed(2)} %</p>
                <p className="resultado_p">Parcelas: {parcelas}x de R$: {Number(valorParcela).toFixed(2)}</p>
                <p className="resultado_p">Valor total: {Number(valorTotal).toFixed(2)}</p>
            </div>

         </div>
    )
}

export default Resultado;