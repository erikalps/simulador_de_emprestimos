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
    conversion_rates: { BRL: 1, USD: 0.19, EUR: 0.18 }
  });



  const Calcular = () => {
    setMostrarResultado(true);
    setActiveTab("resultado");
  };


  useEffect(() => {

    fetch('https://v6.exchangerate-api.com/v6/c140735a3efc6c7eb2fb7734/latest/USD')
      .then((res) => res.json())
      .then((dados) => {
        if (dados && dados.conversation_rates) {
          setTaxaCambio(dados);
        }


      })

  }, [])

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="header-badge">
          <span className="header-badge-dot"></span>
          Ferramenta Financeira
        </div>
        <h1>Simulador de <span>Empréstimos</span></h1>
        <p className="header-sub">Calcule parcelas, juros e compare sistemas de amortização</p>
      </header>

      {/* Main Card */}
      <div className="main-card">
        {/* Tab Bar */}
        <div className="tab-bar">
          <button
            className={`tab-btn ${activeTab === "simular" ? "active" : ""}`}
            onClick={() => setActiveTab("simular")}
          >
            Simulação
          </button>
          <button
            className={`tab-btn ${activeTab === "resultado" ? "active" : ""}`}
            onClick={() => { if (mostrarResultado) setActiveTab("resultado"); }}
            disabled={!mostrarResultado}
          >
            Resultado
          </button>
          <button
            className={`tab-btn ${activeTab === "sobre" ? "active" : ""}`}
            onClick={() => setActiveTab("sobre")}
          >
            Sistemas
          </button>
        </div>

        <div className="card-body">
          {activeTab === "simular" && (
            <Input
              valor={valor} setValor={setValor}
              juros={juros} setJuros={setJuros}
              parcelas={parcelas} setParcelas={setParcelas}
              Calcular={Calcular}
              sistema={sistema} setSistema={setSistema}
            />
          )}

          {activeTab === "resultado" && mostrarResultado && (
            <div className="resultado-wrapper">
              <Resultado
                valor={valor} juros={juros} parcelas={parcelas}
                taxaCambio={taxaCambio} sistema={sistema}
              />
            </div>
          )}

          {activeTab === "sobre" && (
            <div style={{ padding: "8px 0" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  {
                    tag: "PRICE", color: "var(--accent-bright)",
                    title: "Tabela Price",
                    desc: "Parcelas fixas durante todo o contrato. Os juros são maiores no início e a amortização do capital aumenta progressivamente. Ideal para quem quer previsibilidade no orçamento."
                  },
                  {
                    tag: "SAC", color: "var(--green)",
                    title: "SAC — Amortização Constante",
                    desc: "A amortização do capital é sempre igual. As parcelas começam maiores e diminuem com o tempo. O total de juros pagos é menor que no Price. Bom para quem pode pagar mais no início."
                  },
                  {
                    tag: "SAM", color: "var(--blue)",
                    title: "SAM — Sistema Misto",
                    desc: "Média aritmética entre Price e SAC. As parcelas também decrescem, mas de forma mais suave. Equilibra previsibilidade e custo total de juros."
                  }
                ].map(item => (
                  <div key={item.tag} style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px 18px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <span style={{
                        background: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${item.color} 30%, transparent)`,
                        color: item.color,
                        borderRadius: "6px",
                        padding: "2px 8px",
                        fontSize: "0.65rem",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        fontFamily: "var(--font-mono)"
                      }}>{item.tag}</span>
                      <span style={{ fontWeight: "600", fontSize: "0.85rem", color: "var(--text-primary)" }}>{item.title}</span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.6", fontFamily: "var(--font-display)" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default App;
