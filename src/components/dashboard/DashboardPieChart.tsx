"use client";

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartContainer,
} from "@/components/ui/chart";

const chartData = [
  { browser: "Chrome", visitors: 275 },
  { browser: "Edge", visitors: 173 },
  { browser: "Other", visitors: 90 },
];

const chartConfig = {
  Chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  Edge: {
    label: "Edge",
    color: "hsl(var(--chart-2))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function DashboardPieChart() {
  return (
    <Card className="w-full md:w-6/12">
      <CardHeader>
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Visitors by Browser</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig} className="min-h-[250px]">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
                label
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
