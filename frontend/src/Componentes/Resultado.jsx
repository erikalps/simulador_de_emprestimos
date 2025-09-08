import React from "react";
import "./Resultado.css"
const Resultado =({valor, juros, parcelas, taxaCambio, moeda})=>{
    
    if(!valor || !juros || !parcelas) return null;
    
   // Valor convertido para a moeda selecionada
    const valorConvertido = Number(valor) * taxaCambio;
    // Valor da parcela na moeda selecionada
    const valorParcela = (valorConvertido * (1 + Number(juros) / 100)) / Number(parcelas);
    // Valor total na moeda selecionada
    const valorTotal = valorConvertido * (1 + Number(juros) / 100);


    // Função para formatar moeda
    const formatar = (num) =>
     new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: moeda,
    }).format(num);


    
    return(
        <div className="resultado">
             <h2>Simulação Realizada</h2>
             <div>
                <p className="resultado_p">Empréstimo: {formatar(valorConvertido)}</p>
                <p className="resultado_p">Juros: {Number(juros).toFixed(2)} %</p>
                <p className="resultado_p">
                    Parcelas: {parcelas}x de {formatar(valorParcela)}
                </p>
                <p className="resultado_p">Valor total: {formatar(valorTotal)}</p>
            </div>
        </div>
    )
}

export default Resultado;