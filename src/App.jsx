import React, { useState } from 'react';

export default function App() {
  const [score, setScore] = useState(5);
  const [emotion, setEmotion] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="container">
      <h1>영애의 감정 루틴</h1>
      <label>
        오늘의 감정 점수 (1~10)
        <select value={score} onChange={(e) => setScore(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <label>
        오늘 느낀 감정
        <input
          type="text"
          placeholder="예: 기쁨, 불안..."
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
        />
      </label>
      <label>
        감정 회고
        <textarea
          placeholder="왜 그렇게 느꼈는지 적어보세요."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
      <button onClick={() => alert('기록 완료!')}>기록하기</button>
    </div>
  );
}
