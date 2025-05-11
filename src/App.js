import { useState } from 'react';
import './App.css';

const emotionColors = {
  기쁨: '#ffe066',
  불안: '#ff8787',
  슬픔: '#74c0fc',
  분노: '#ffa94d',
  평온: '#b2f2bb',
  놀람: '#d0bfff'
};

const emotionMessages = {
  기쁨: '이 감정을 마음껏 누려도 좋아요!',
  불안: '불안은 새로운 시작의 신호일 수 있어요.',
  슬픔: '그 감정, 충분히 느껴도 괜찮아요.',
  분노: '화를 표현하는 것도 나를 지키는 방법이에요.',
  평온: '지금 이 순간을 꼭 기억해요.',
  놀람: '예상치 못한 일도 나를 성장시켜요.'
};

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

  const bgColor = emotionColors[emotion] || '#ffffff';
  const message = emotionMessages[emotion];

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <h1>영애의 감정 루틴</h1>

      <div className="card">
        <label>오늘의 감정 점수 (1~10)</label>
        <input type="number" min="1" max="10" value={score} onChange={(e) => setScore(Number(e.target.value))} />

        <label>오늘 느낀 감정</label>
        <input value={emotion} onChange={(e) => setEmotion(e.target.value)} placeholder="예: 기쁨, 불안..." />

        {emotion && message && (
          <div className="message">
            💬 {message}
          </div>
        )}

        <label>감정 회고</label>
        <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="왜 그렇게 느꼈는지 적어보세요." rows={4} />

        <button onClick={handleSave}>기록하기</button>
      </div>

      <div className="log">
        {log.map((entry, i) => (
          <div className="entry" key={i}>
            <p><strong>{entry.date}</strong></p>
            <p>감정 점수: {entry.score}</p>
            <p>감정: {entry.emotion}</p>
            <p>{entry.reflection}</p>
          </div>
        ))}
      </div>
    </div>
  );
}