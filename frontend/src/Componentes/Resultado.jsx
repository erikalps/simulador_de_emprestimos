import React from "react";

const Resultado =({valor, juros, parcelas})=>{
    
    if(!valor || !juros || !parcelas) return null;
    
   const valorParcela = (Number(valor) * (1 + Number(juros) / 100)) / Number(parcelas);
  const valorTotal = Number(valor) * (1 + Number(juros) / 100);

    
    return(
         <>
            <h2>Simulação Realizada</h2>
            <div>
                <p>Emprestimo: {Number(valor).toFixed(2)}</p>
                <p>Juros: {Number(juros).toFixed(2)} %</p>
                <p>Parcelas: {parcelas}x de R$: {Number(valorParcela).toFixed(2)}</p>
                <p>Valor total: {Number(valorTotal).toFixed(2)}</p>
            </div>

         </>
    )
}

export default Resultado;