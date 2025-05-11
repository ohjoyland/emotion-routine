import React, { useState } from 'react';
import './style.css';

function App() {
  const [score, setScore] = useState(5);
  const [emotion, setEmotion] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    alert(`감정 점수: ${score}\n감정: ${emotion}\n메모: ${note}`);
  };

  return (
    <div className="container">
      <h1>오늘의 감정루틴</h1>
      <label>오늘의 감정 점수 (1~10)</label>
      <select value={score} onChange={e => setScore(e.target.value)}>
        {[...Array(10)].map((_, i) => (
          <option key={i+1} value={i+1}>{i+1}</option>
        ))}
      </select>

      <label>오늘 느낀 감정</label>
      <input
        type="text"
        placeholder="예: 기쁨, 불안..."
        value={emotion}
        onChange={e => setEmotion(e.target.value)}
      />

      <label>감정 회고</label>
      <textarea
        placeholder="왜 그렇게 느꼈는지 적어보세요."
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <button onClick={handleSubmit}>기록하기</button>
    </div>
  );
}

export default App;
