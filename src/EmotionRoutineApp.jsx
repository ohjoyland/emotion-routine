import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const EmotionRoutineApp = () => {
  const [emotion, setEmotion] = useState("");
  const [log, setLog] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSave = () => {
    if (!emotion.trim()) return;
    const newLog = [...log, { date: selectedDate.toISOString().split("T")[0], emotion }];
    setLog(newLog);
    setEmotion("");
  };

  const groupedData = log.reduce((acc, entry) => {
    const existing = acc.find((item) => item.date === entry.date);
    if (!existing) acc.push({ date: entry.date, emotion: entry.emotion });
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">오늘의 마음루틴</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="space-y-4 p-4">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
            <Input placeholder="오늘의 감정을 입력하세요" value={emotion} onChange={(e) => setEmotion(e.target.value)} />
            <Button onClick={handleSave} className="w-full">감정 저장</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">감정 기록</h2>
            <ul className="space-y-1 max-h-60 overflow-y-auto">
              {groupedData.map((item, index) => (
                <li key={index}>{item.date}: {item.emotion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">감정 그래프</h2>
        <LineChart width={600} height={300} data={groupedData.map(item => ({ date: item.date, value: item.emotion.length }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default EmotionRoutineApp;
