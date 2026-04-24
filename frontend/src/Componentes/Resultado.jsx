import React, { useState, useMemo } from "react";
import "./Resultado.css";

// ── Cálculo PRICE ──
function calcPrice(principal, taxaMensal, n) {
  const r = taxaMensal / 100;
  const pmt = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const rows = [];
  let saldo = principal;
  for (let i = 1; i <= n; i++) {
    const juros = saldo * r;
    const amort = pmt - juros;
    saldo -= amort;
    rows.push({ parcela: i, prestacao: pmt, juros, amortizacao: amort, saldo: Math.max(saldo, 0) });
  }
  return rows;
}

// ── Cálculo SAC ──
function calcSac(principal, taxaMensal, n) {
  const r = taxaMensal / 100;
  const amortConst = principal / n;
  const rows = [];
  let saldo = principal;
  for (let i = 1; i <= n; i++) {
    const juros = saldo * r;
    const prestacao = amortConst + juros;
    saldo -= amortConst;
    rows.push({ parcela: i, prestacao, juros, amortizacao: amortConst, saldo: Math.max(saldo, 0) });
  }
  return rows;
}

// ── Cálculo SAM ──
function calcSam(principal, taxaMensal, n) {
  const price = calcPrice(principal, taxaMensal, n);
  const sac = calcSac(principal, taxaMensal, n);
  return price.map((p, i) => ({
    parcela: i + 1,
    prestacao: (p.prestacao + sac[i].prestacao) / 2,
    juros: (p.juros + sac[i].juros) / 2,
    amortizacao: (p.amortizacao + sac[i].amortizacao) / 2,
    saldo: (p.saldo + sac[i].saldo) / 2,
  }));
}

const fmt = (num, currency = "BRL") =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(num);

const fmtCompact = (num) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact" }).format(num);

const SYSTEM_LABELS = { PRICE: "Tabela Price", SAC: "SAC", SAM: "SAM" };

const Resultado = ({ valor, juros, parcelas, taxaCambio, sistema = "PRICE" }) => {
  const [tableOpen, setTableOpen] = useState(false);

  if (!valor || !juros || !parcelas) return null;

  const v = Number(valor);
  const r = Number(juros);
  const n = Number(parcelas);
  if (v <= 0 || r <= 0 || n < 1) return null;

  // Calcular tabela de amortização
  const tabela = useMemo(() => {
    if (sistema === "SAC") return calcSac(v, r, n);
    if (sistema === "SAM") return calcSam(v, r, n);
    return calcPrice(v, r, n);
  }, [v, r, n, sistema]);

  const totalPago = tabela.reduce((acc, row) => acc + row.prestacao, 0);
  const totalJuros = tabela.reduce((acc, row) => acc + row.juros, 0);
  const primeiraParcela = tabela[0]?.prestacao || 0;
  const ultimaParcela = tabela[tabela.length - 1]?.prestacao || 0;
  const jurosPercent = ((totalJuros / v) * 100).toFixed(1);
  const taxaEfetiva = ((Math.pow(1 + r / 100, 12) - 1) * 100).toFixed(2);

  const usdRate = taxaCambio?.conversion_rates?.USD || 0.19;
  const eurRate = taxaCambio?.conversion_rates?.EUR || 0.18;

  return (
    <div className="resultado">
      {/* Header */}
      <div className="resultado-header">
        <div className="resultado-header-left">
          <h2>Simulação Realizada</h2>
          <span className="resultado-system-tag">Sistema: {SYSTEM_LABELS[sistema]}</span>
        </div>
        <div className="resultado-status">
          <span className="status-dot"></span>
          Concluído
        </div>
      </div>

      <div className="resultado-body">
        {/* Total Highlight */}
        <div className="total-highlight">
          <div className="total-item">
            <span className="total-item-label">Total a Pagar</span>
            <span className="total-item-value big">{fmtCompact(totalPago)}</span>
            <span className="total-item-sub">{fmt(totalPago)}</span>
          </div>
          <div className="total-item">
            <span className="total-item-label">
              {sistema === "PRICE" ? "Parcela Fixa" : "1ª Parcela"}
            </span>
            <span className="total-item-value big" style={{ color: "var(--green)" }}>
              {fmtCompact(primeiraParcela)}
            </span>
            <span className="total-item-sub">{fmt(primeiraParcela)}</span>
          </div>
        </div>

        {/* Progress bar - custo dos juros */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Peso dos Juros no Total</span>
            <span className="progress-pct">{jurosPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${Math.min(Number(jurosPercent), 100)}%` }} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">💸</span>
            <span className="stat-label">Total em Juros</span>
            <span className="stat-value orange">{fmt(totalJuros)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <span className="stat-label">Capital</span>
            <span className="stat-value blue">{fmt(v)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📅</span>
            <span className="stat-label">Prazo</span>
            <span className="stat-value">{n}x meses</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📊</span>
            <span className="stat-label">Taxa Efetiva a.a.</span>
            <span className="stat-value green">{taxaEfetiva}%</span>
          </div>
          {sistema !== "PRICE" && (
            <div className="stat-card">
              <span className="stat-icon">🔚</span>
              <span className="stat-label">Última Parcela</span>
              <span className="stat-value purple">{fmt(ultimaParcela)}</span>
            </div>
          )}
          <div className="stat-card">
            <span className="stat-icon">📉</span>
            <span className="stat-label">Custo / R$1.000</span>
            <span className="stat-value orange">
              {fmt((totalJuros / v) * 1000)}
            </span>
          </div>
        </div>

        {/* Currency conversion */}
        <div className="currency-section-title">Equivalência Internacional</div>
        <div className="currency-row">
          <div className="currency-item">
            <span className="currency-flag">🇧🇷</span>
            <div className="currency-code">BRL</div>
            <div className="currency-amount">{fmt(totalPago, "BRL")}</div>
          </div>
          <div className="currency-item">
            <span className="currency-flag">🇺🇸</span>
            <div className="currency-code">USD</div>
            <div className="currency-amount">{fmt(totalPago * usdRate, "USD")}</div>
          </div>
          <div className="currency-item">
            <span className="currency-flag">🇪🇺</span>
            <div className="currency-code">EUR</div>
            <div className="currency-amount">{fmt(totalPago * eurRate, "EUR")}</div>
          </div>
        </div>

        {/* Hidden p tags for backward compat */}
        <p className="resultado_p">Empréstimo: {fmt(v)}</p>
        <p className="resultado_p">Juros: {r.toFixed(2)}%</p>
        <p className="resultado_p">Parcelas: {n}x de {fmt(primeiraParcela)}</p>
        <p className="resultado_p">Valor total: {fmt(totalPago)}</p>
        <p className="resultado_p">Valor total em dolares: {fmt(totalPago * usdRate, "USD")}</p>
        <p className="resultado_p">Valor total em euros: {fmt(totalPago * eurRate, "EUR")}</p>

        {/* Amortization table - NEW FEATURE */}
        <div className="amort-table-section">
          <button
            type="button"
            className="toggle-table-btn"
            onClick={() => setTableOpen((o) => !o)}
          >
            <span>Tabela de Amortização ({n} parcelas)</span>
            <span className={`toggle-icon ${tableOpen ? "open" : ""}`}>▾</span>
          </button>
          {tableOpen && (
            <div className="amort-table-wrapper">
              <table className="amort-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Prestação</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                    <th>Saldo Dev.</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela.map((row) => (
                    <tr key={row.parcela}>
                      <td>{row.parcela}</td>
                      <td className="td-orange">{fmt(row.prestacao)}</td>
                      <td className="td-blue">{fmt(row.amortizacao)}</td>
                      <td className="td-green">{fmt(row.juros)}</td>
                      <td>{fmt(row.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resultado;