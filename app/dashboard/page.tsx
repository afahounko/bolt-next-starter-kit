import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,338",
      change: "+18.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Avg. Session",
      value: "4m 38s",
      change: "-12.3%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+4.3%",
      trend: "up",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your analytics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p
                className={`text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="text-lg font-medium mb-4">Revenue Over Time</h3>
          <div className="h-[350px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Revenue chart will be displayed here</p>
          </div>
        </Card>

        <Card className="col-span-3 p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">New user signed up</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
