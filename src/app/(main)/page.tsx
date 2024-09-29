import Image from "next/image";
import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardAreaChart from "@/components/dashboard/DashboardAreaChart";
import DashboardPieChart from "@/components/dashboard/DashboardPieChart";
import DashboardBarChart from "@/components/dashboard/DashboardBarChart";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="flex-1 space-y-5 ">
          <h2 className="text-3xl font-semibold">Welcome to the Dashboard</h2>
          <DashboardCards />
          <DashboardAreaChart />
          
        </div>
      </div>
    </main>
  );
}
