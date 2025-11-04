import React, { useState, useMemo } from "react";

export default function App() {
  const defaultRows = 8;
  const defaultCols = 8;

  const [rows] = useState(defaultRows);
  const [cols] = useState(defaultCols);
  const [activeCells, setActiveCells] = useState(new Set());

  const toggleCell = (r, c) => {
    setActiveCells((prev) => {
      const next = new Set(prev);
      const key = `${r},${c}`;
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearAll = () => setActiveCells(new Set());

  const rowArray = useMemo(() => Array.from({ length: rows }, (_, i) => i), [rows]);
  const colArray = useMemo(() => Array.from({ length: cols }, (_, i) => i), [cols]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Matrix Grid Example (No Tailwind)</h1>

      <button style={styles.clearBtn} onClick={clearAll}>
        Clear All
      </button>

      <div style={styles.gridWrapper}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `60px repeat(${cols}, 50px)`,
          }}
        >
          {/* Top-left corner cell (empty) */}
          <div style={styles.headerCell}></div>
          {colArray.map((c) => (
            <div key={c} style={styles.headerCell}>
              {c}
            </div>
          ))}

          {/* Grid rows */}
          {rowArray.map((r) => (
            <React.Fragment key={r}>
              <div style={styles.headerCell}>{r}</div>
              {colArray.map((c) => {
                const key = `${r},${c}`;
                const active = activeCells.has(key);
                return (
                  <div
                    key={key}
                    onClick={() => toggleCell(r, c)}
                    style={{
                      ...styles.cell,
                      backgroundColor: active ? "#4F46E5" : "white",
                      color: active ? "white" : "#333",
                    }}
                  >
                    {active ? "●" : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <p style={styles.footer}>Active Cells: {activeCells.size}</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  clearBtn: {
    marginBottom: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  gridWrapper: {
    display: "inline-block",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  headerCell: {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "8px",
    cursor: "pointer",
    userSelect: "none",
  },
  footer: {
    marginTop: "15px",
    color: "#555",
  },
};
