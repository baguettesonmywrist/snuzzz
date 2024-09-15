"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wakeUpTime, setWakeUpTime] = useState("");

  const router = useRouter();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTracking) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTracking]);

  const handleTrackingToggle = () => {
    if (!isTracking) {
      setElapsedTime(0);
    }
    setIsTracking(!isTracking);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [hours, minutes, remainingSeconds]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  const calculateSleepBy = (wakeUpTime: string): string => {
    if (!wakeUpTime) return "";
    const [hours, minutes] = wakeUpTime.split(":").map(Number);
    const wakeUpDate = new Date();
    wakeUpDate.setHours(hours, minutes, 0, 0);
    const sleepByDate = new Date(wakeUpDate.getTime() - 8 * 60 * 60 * 1000);
    return `${String(sleepByDate.getHours()).padStart(2, "0")}:${String(
      sleepByDate.getMinutes()
    ).padStart(2, "0")}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => router.push("/analytics")}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <h1 className="text-4xl font-bold mb-8 text-center absolute top-0 left-1/2 transform -translate-x-1/2 mt-8">
        SnuZzz
      </h1>
      <p className="text-4xl font-bold mb-8 text-white">
        {formatTime(elapsedTime)}
      </p>
      <Button
        onClick={handleTrackingToggle}
        size="lg"
        variant="outline"
        className={`w-40 h-40 rounded-full text-2xl font-bold mb-8 ${
          isTracking
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isTracking ? "Wake Up" : "Sleep"}
      </Button>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg text-center font-semibold mb-2 w-[120px]">
              Wake Up Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              id="wakeUpTime"
              type="time"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className="mb-4 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg text-center font-semibold mb-2 w-[120px] h-[80px]">
              Sleep By
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">
              {calculateSleepBy(wakeUpTime)}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
