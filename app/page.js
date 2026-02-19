"use client";
import React, { useState, useEffect } from "react";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const TOTAL_WEEKS = 12;
const VIDEOS = {
  "Lunes": "https://www.youtube.com/embed/gC_L9qAHVJ8",
  "Martes": "https://www.youtube.com/embed/ml6cT4AZdqI",
  "Miércoles": "https://www.youtube.com/embed/UItWltVZZmE",
  "Jueves": "https://www.youtube.com/embed/UBMk30rjy0o",
  "Viernes": "https://www.youtube.com/embed/2pLT-olgUJs",
  "Sábado": "https://www.youtube.com/embed/v7AYKMP6rOE"
};

export default function Home() {
  const [week, setWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [completed, setCompleted] = useState({});
  const [notes, setNotes] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("training");
    if (saved) {
      const data = JSON.parse(saved);
      setCompleted(data.completed || {});
      setNotes(data.notes || "");
      setWeight(data.weight || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "training",
      JSON.stringify({ completed, notes, weight })
    );
  }, [completed, notes, weight]);

  const toggleComplete = () => {
    const key = `W${week}-${selectedDay}`;
    setCompleted({ ...completed, [key]: !completed[key] });
  };

  const progress = () => {
    const total = TOTAL_WEEKS * DAYS.length;
    const done = Object.values(completed).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div style={{ padding: 40, fontFamily: "system-ui", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "auto", background: "#fff", padding: 30, borderRadius: 12 }}>
        <h1 style={{ textAlign: "center" }}>Entrenamiento Premium</h1>

        <h2 style={{ textAlign: "center" }}>
          Semana {week}
        </h2>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <button onClick={() => setWeek(Math.max(1, week - 1))}>◀</button>
          <button onClick={() => setWeek(Math.min(TOTAL_WEEKS, week + 1))} style={{ marginLeft: 10 }}>▶</button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ height: 6, background: "#ddd", borderRadius: 4 }}>
            <div style={{ width: `${progress()}%`, height: "100%", background: "#000" }} />
          </div>
          <p style={{ textAlign: "center" }}>Progreso total: {progress()}%</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))", gap: 10 }}>
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: 10,
                background: selectedDay === day ? "#000" : "#fff",
                color: selectedDay === day ? "#fff" : "#000",
                border: "1px solid #ddd"
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 30 }}>
          <h3>{selectedDay}</h3>
          <p>Entrenamiento guiado de 15 minutos</p>
            <div style={{ marginTop: 20 }}>
  <iframe
    width="100%"
    height="315"
    src={VIDEOS[selectedDay]}
    title="Entrenamiento"
    frameBorder="0"
    allowFullScreen
  ></iframe>
</div>

          <button
            onClick={toggleComplete}
            style={{
              padding: "10px 20px",
              background: completed[`W${week}-${selectedDay}`] ? "#000" : "#fff",
              color: completed[`W${week}-${selectedDay}`] ? "#fff" : "#000",
              border: "1px solid #000"
            }}
          >
            {completed[`W${week}-${selectedDay}`] ? "Completado ✓" : "Marcar como completado"}
          </button>

          <div style={{ marginTop: 20 }}>
            <input
              type="number"
              placeholder="Peso corporal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <textarea
              placeholder="Notas del día..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: 10 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
