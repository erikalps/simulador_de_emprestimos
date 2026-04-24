import React, { useState } from "react";
import "./Input.css";

const Input = ({ valor, setValor, juros, setJuros, parcelas, setParcelas, Calcular, sistema, setSistema }) => {
  const [touched, setTouched] = useState({ valor: false, juros: false, parcelas: false });

  const errors = {
    valor: touched.valor && (!valor || Number(valor) <= 0),
    juros: touched.juros && (!juros || Number(juros) <= 0 || Number(juros) > 100),
    parcelas: touched.parcelas && (!parcelas || Number(parcelas) < 1 || Number(parcelas) > 360),
  };

  const canCalculate = valor && juros && parcelas &&
    Number(valor) > 0 && Number(juros) > 0 && Number(juros) <= 100 &&
    Number(parcelas) >= 1 && Number(parcelas) <= 360;

  const handleCalc = () => {
    setTouched({ valor: true, juros: true, parcelas: true });
    if (canCalculate) Calcular();
  };

  // Slider progress %
  const jurosPct = juros ? Math.min((Number(juros) / 20) * 100, 100) : 0;
  const parcelasPct = parcelas ? Math.min((Number(parcelas) / 360) * 100, 100) : 0;

  return (
    <form className="input_form" onSubmit={(e) => e.preventDefault()}>

      {/* Sistema de amortização */}
      <div className="section-divider">
        <span className="divider-line"></span>
        <span>Sistema</span>
        <span className="divider-line"></span>
      </div>

      <div className="system-selector">
        {[
          { key: "PRICE", label: "PRICE", name: "Tabela Price" },
          { key: "SAC", label: "SAC", name: "Amortiz. Const." },
          { key: "SAM", label: "SAM", name: "Misto" },
        ].map((s) => (
          <button
            key={s.key}
            type="button"
            className={`system-btn ${sistema === s.key ? "active" : ""}`}
            onClick={() => setSistema(s.key)}
          >
            <span className="sys-label">{s.label}</span>
            <span className="sys-name">{s.name}</span>
          </button>
        ))}
      </div>

      <div className="section-divider">
        <span className="divider-line"></span>
        <span>Dados</span>
        <span className="divider-line"></span>
      </div>

      {/* Valor */}
      <div className="field-group">
        <label className="field-label">
          <span className="field-label-icon">💰</span>
          Valor do Empréstimo
          {valor > 0 && (
            <span className="field-hint">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor)}
            </span>
          )}
        </label>
        <div className="input-wrapper">
          <span className="input-prefix">R$</span>
          <input
            type="number"
            placeholder="0,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, valor: true }))}
            className={errors.valor ? "invalid" : ""}
            min="0"
            step="100"
          />
          <span className="input-suffix">BRL</span>
        </div>
        <div className={`field-error ${errors.valor ? "visible" : ""}`}>
          ⚠ Informe um valor maior que zero
        </div>
      </div>

      {/* Juros */}
      <div className="field-group">
        <label className="field-label">
          <span className="field-label-icon">📈</span>
          Taxa de Juros (a.m.)
          {juros > 0 && (
            <span className="field-hint">{Number(juros).toFixed(2)}% ao mês</span>
          )}
        </label>
        <div className="input-wrapper">
          <span className="input-prefix">%</span>
          <input
            type="number"
            placeholder="0.00"
            value={juros}
            onChange={(e) => setJuros(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, juros: true }))}
            className={errors.juros ? "invalid" : ""}
            min="0"
            max="100"
            step="0.1"
          />
          <span className="input-suffix">a.m.</span>
        </div>
        <div className="slider-container">
          <input
            type="range"
            className="range-slider"
            min="0"
            max="20"
            step="0.1"
            value={juros || 0}
            onChange={(e) => setJuros(e.target.value)}
            style={{ "--slider-progress": `${jurosPct}%` }}
          />
          <div className="range-labels">
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
          </div>
        </div>
        <div className={`field-error ${errors.juros ? "visible" : ""}`}>
          ⚠ Taxa deve estar entre 0.01% e 100%
        </div>
      </div>

      {/* Parcelas */}
      <div className="field-group">
        <label className="field-label">
          <span className="field-label-icon">📅</span>
          Número de Parcelas
          {parcelas > 0 && (
            <span className="field-hint">
              {Math.floor(parcelas / 12) > 0 ? `${Math.floor(parcelas / 12)}a ` : ""}
              {parcelas % 12 > 0 ? `${parcelas % 12}m` : ""}
            </span>
          )}
        </label>
        <div className="input-wrapper">
          <span className="input-prefix">#</span>
          <input
            type="number"
            placeholder="12"
            value={parcelas}
            onChange={(e) => setParcelas(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, parcelas: true }))}
            className={errors.parcelas ? "invalid" : ""}
            min="1"
            max="360"
          />
          <span className="input-suffix">meses</span>
        </div>
        <div className="slider-container">
          <input
            type="range"
            className="range-slider"
            min="1"
            max="360"
            step="1"
            value={parcelas || 1}
            onChange={(e) => setParcelas(e.target.value)}
            style={{ "--slider-progress": `${parcelasPct}%` }}
          />
          <div className="range-labels">
            <span>1 mês</span>
            <span>15 anos</span>
            <span>30 anos</span>
          </div>
        </div>
        <div className={`field-error ${errors.parcelas ? "visible" : ""}`}>
          ⚠ Parcelas entre 1 e 360 meses
        </div>
      </div>

      {/* Button */}
      <div className="calc-btn-wrapper">
        <button
          type="button"
          className="calc-btn"
          onClick={handleCalc}
          disabled={false}
        >
          Simular Empréstimo
          <span className="btn-icon">→</span>
        </button>
      </div>
    </form>
  );
};

export default Input;