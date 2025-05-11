
import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [score, setScore] = useState('10');
  const [emotion, setEmotion] = useState('');
  const [reason, setReason] = useState('');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('emotionEntries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('emotionEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = () => {
    const newEntry = {
      time: new Date().toLocaleString(),
      score,
      emotion,
      reason
    };
    setEntries([newEntry, ...entries]);
    setEmotion('');
    setReason('');
  };

  return (
    <div className="container">
      <h1>오늘의 감정루틴</h1>
      <label>오늘의 감정 점수 (1~10)</label>
      <select value={score} onChange={(e) => setScore(e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <label>오늘 느낀 감정</label>
      <input
        type="text"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        placeholder="예: 기쁨, 불안..."
      />

      <label>감정 회고</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="왜 그렇게 느꼈는지 적어보세요."
      />

      <button onClick={handleSubmit}>기록하기</button>

      <div className="log-section">
        {entries.map((entry, index) => (
          <div key={index} className="log-entry">
            <span>📔 기록된 감정</span>
            <p><strong>시간:</strong> {entry.time}</p>
            <p><strong>감정 점수:</strong> {entry.score}</p>
            <p><strong>감정:</strong> {entry.emotion}</p>
            <p><strong>회고:</strong> {entry.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
