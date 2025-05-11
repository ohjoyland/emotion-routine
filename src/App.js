import { useState } from 'react';

export default function App() {
  const [score, setScore] = useState(5);
  const [emotion, setEmotion] = useState('');
  const [reflection, setReflection] = useState('');
  const [log, setLog] = useState([]);

  const handleSave = () => {
    const entry = {
      date: new Date().toLocaleDateString(),
      score,
      emotion,
      reflection
    };
    setLog([entry, ...log]);
    setEmotion('');
    setReflection('');
    setScore(5);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>영애의 감정 루틴</h1>

      <div style={{ marginBottom: 20 }}>
        <label>오늘의 감정 점수 (1~10)</label><br/>
        <input type="number" min="1" max="10" value={score} onChange={(e) => setScore(Number(e.target.value))} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>오늘 느낀 감정</label><br/>
        <input value={emotion} onChange={(e) => setEmotion(e.target.value)} placeholder="예: 기쁨, 불안..." />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>감정 회고</label><br/>
        <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="왜 그렇게 느꼈는지 적어보세요." rows={4} style={{ width: '100%' }} />
      </div>

      <button onClick={handleSave}>기록하기</button>

      <div style={{ marginTop: 40 }}>
        {log.map((entry, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <p><strong>{entry.date}</strong></p>
            <p>감정 점수: {entry.score}</p>
            <p>감정: {entry.emotion}</p>
            <p>회고: {entry.reflection}</p>
          </div>
        ))}
      </div>
    </div>
  );
}