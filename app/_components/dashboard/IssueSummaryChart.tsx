"use client";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummaryChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open, color: "bg-error" },
    { label: "In Progress", value: inProgress, color: "bg-warning" },
    { label: "Closed", value: closed, color: "bg-primary" },
  ];
  return (
    <div className="card bg-base-300 p-5 mb-5">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar dataKey={"value"} barSize={60} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueSummaryChart;
