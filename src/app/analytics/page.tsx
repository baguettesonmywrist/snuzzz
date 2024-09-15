"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const generateRandomData = () => {
  const activities = [
    "Sports",
    "Drinking",
    "Reading",
    "Meditation",
    "TV",
    "Gaming",
  ];
  const date = new Date();

  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(date.setDate(date.getDate() - i)).toLocaleDateString(),
    sleepStart: `${Math.floor(Math.random() * 4) + 21}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")}`,
    duration: `${Math.floor(Math.random() * 3) + 6}h ${Math.floor(
      Math.random() * 60
    )}m`,
    sleepQuality: Math.floor(Math.random() * 31) + 70,
    activities: activities
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .join(", "),
  }));
};

const chartConfig = {
  sleepQuality: {
    label: "Sleep Quality",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Analytics() {
  const [sleepQuality, setSleepQuality] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSleepQuality(Math.floor(Math.random() * 21) + 70);
    setData(generateRandomData());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="flex justify-center items-stretch w-full mb-8 space-x-8">
        <Card className="w-1/3 flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">Sleep Quality</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <p className="text-6xl font-bold text-center">{sleepQuality}</p>
          </CardContent>
        </Card>

        <Card className="w-2/3 flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              Sleep Quality Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="sleepQuality"
                  stroke="var(--color-sleepQuality)"
                  strokeWidth={3}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-center">Sleep Log</h1>
      <div className="w-full max-w-4xl overflow-x-auto">
        <Table>
          <TableCaption>Sleep data for the last 7 days</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Sleep Start</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Sleep Quality</TableHead>
              <TableHead>Activities Done</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.sleepStart}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.sleepQuality}</TableCell>
                <TableCell>{row.activities}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
