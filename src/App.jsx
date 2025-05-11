import React, { useState, useEffect } from 'react';
import './style.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [score, setScore] = useState("5");
  const [emotion, setEmotion] = useState("");
  const [reason, setReason] = useState("");
  const [records, setRecords] = useState(() => JSON.parse(localStorage.getItem("emotions")) || []);

  const handleSubmit = () => {
    const newEntry = {
      date: new Date().toLocaleString(),
      score,
      emotion,
      reason,
    };
    const newRecords = [newEntry, ...records];
    setRecords(newRecords);
    localStorage.setItem("emotions", JSON.stringify(newRecords));
  };

  const chartData = {
    labels: records.map((r) => r.date),
    datasets: [
      {
        label: '감정 점수',
        data: records.map((r) => parseInt(r.score)),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container">
      <h1>오늘의 감정루틴</h1>
      <select value={score} onChange={(e) => setScore(e.target.value)}>
        {[...Array(10)].map((_, i) => (
          <option key={i} value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <input placeholder="오늘 느낀 감정" value={emotion} onChange={(e) => setEmotion(e.target.value)} />
      <textarea placeholder="왜 그렇게 느꼈는지 적어보세요." value={reason} onChange={(e) => setReason(e.target.value)} />
      <button onClick={handleSubmit}>기록하기</button>

      <div className="record-list">
        {records.map((r, i) => (
          <div key={i} className="record-card">
            <p><strong>🕒</strong> {r.date}</p>
            <p><strong>감정 점수:</strong> {r.score}</p>
            <p><strong>감정:</strong> {r.emotion}</p>
            <p><strong>회고:</strong> {r.reason}</p>
          </div>
        ))}
      </div>

      <div className="graph">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;
