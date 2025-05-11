// App.jsx - 전체 기능 포함된 오늘의 마음루틴
import React, { useState, useEffect } from 'react';
import EmotionInput from './components/EmotionInput';
import EmotionList from './components/EmotionList';
import EmotionSearch from './components/EmotionSearch';
import EmotionGraph from './components/EmotionGraph';
import { loadLogs, saveLogs } from './utils/storage';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const stored = loadLogs();
    setLogs(stored);
    setFilteredLogs(stored);
  }, []);

  const handleAddLog = (newEntry) => {
    const newLogs = [newEntry, ...logs];
    setLogs(newLogs);
    setFilteredLogs(newLogs);
    saveLogs(newLogs);
  };

  const handleSearch = (keyword) => {
    if (!keyword) return setFilteredLogs(logs);
    const results = logs.filter(
      (entry) =>
        entry.emotion.includes(keyword) ||
        entry.note.includes(keyword) ||
        entry.icon.label.includes(keyword)
    );
    setFilteredLogs(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-sky-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">오늘의 마음루틴</h1>
      <EmotionInput onSave={handleAddLog} />
      <EmotionSearch onSearch={handleSearch} />
      <EmotionList logs={filteredLogs} />
      <EmotionGraph logs={filteredLogs} />
    </div>
  );
};

export default App;