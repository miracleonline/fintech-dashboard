import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const reportsData = [
  { time: "2018-09-19 00:00", investment: 31, dividend: 11, assets: 15 },
  { time: "2018-09-19 01:30", investment: 40, dividend: 32, assets: 11 },
  { time: "2018-09-19 02:30", investment: 28, dividend: 45, assets: 32 },
  { time: "2018-09-19 03:30", investment: 51, dividend: 32, assets: 18 },
  { time: "2018-09-19 04:30", investment: 42, dividend: 34, assets: 9 },
  { time: "2018-09-19 05:30", investment: 82, dividend: 52, assets: 24 },
  { time: "2018-09-19 06:30", investment: 56, dividend: 41, assets: 11 },
];

export default function ReportsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={reportsData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="investment" stroke="#4154f1" fillOpacity={0.4} fill="#4154f1" />
        <Area type="monotone" dataKey="dividend" stroke="#2eca6a" fillOpacity={0.4} fill="#2eca6a" />
        <Area type="monotone" dataKey="assets" stroke="#ff771d" fillOpacity={0.4} fill="#ff771d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
