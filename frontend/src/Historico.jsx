import React, { useState } from "react";
import "./Historico.css";

const Historico = ({ historico, onCarregar, onLimpar }) => {
  const [aberto, setAberto] = useState(false);

  const formatBRL = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatData = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  };

  return (
    <div className="historico animate-in">
      {/* Header / toggle */}
      <div
        className="historico__header"
        onClick={() => setAberto((v) => !v)}
        role="button"
        tabIndex={0}
        aria-expanded={aberto}
        aria-controls="historico-body"
        onKeyDown={(e) => e.key === "Enter" && setAberto((v) => !v)}
      >
        <div className="historico__header-left">
          <div className="historico__icon" aria-hidden="true">📋</div>
          <span className="historico__title">Histórico de Simulações</span>
          {historico.length > 0 && (
            <span className="historico__count">{historico.length}</span>
          )}
        </div>
        <span className={`historico__chevron ${aberto ? "open" : ""}`} aria-hidden="true">
          ▼
        </span>
      </div>

      {/* Body */}
      <div id="historico-body" className={`historico__body ${aberto ? "expanded" : ""}`}>
        {historico.length === 0 ? (
          <div className="historico__empty">
            <div className="historico__empty-icon">📂</div>
            <div>Nenhuma simulação salva ainda.</div>
            <div>Faça sua primeira simulação acima.</div>
          </div>
        ) : (
          <>
            <div className="historico__list" role="list">
              {historico.map((item, i) => {
                const total = item.valor * (1 + item.juros / 100);
                return (
                  <div
                    key={item.id}
                    className="historico__item"
                    role="listitem"
                    onClick={() => onCarregar(item)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onCarregar(item)}
                    title="Clique para recarregar esta simulação"
                    aria-label={`Simulação de ${formatBRL(item.valor)}, ${item.parcelas} parcelas`}
                  >
                    <div className="historico__item-number">{historico.length - i}</div>
                    <div className="historico__item-info">
                      <div className="historico__item-main">
                        {formatBRL(item.valor)} · {item.juros}% · {item.parcelas}×
                      </div>
                      <div className="historico__item-sub">
                        Parcela: {formatBRL(total / item.parcelas)}/mês
                      </div>
                    </div>
                    <div className="historico__item-total">{formatBRL(total)}</div>
                    <div className="historico__item-date">{formatData(item.data)}</div>
                  </div>
                );
              })}
            </div>

            <div className="historico__footer">
              <span className="historico__footer-hint">
                Clique em um item para recarregar
              </span>
              <button
                className="btn-limpar"
                onClick={(e) => { e.stopPropagation(); onLimpar(); }}
                aria-label="Limpar todo o histórico de simulações"
              >
                Limpar tudo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Historico;