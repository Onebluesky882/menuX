import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for sales by hour
const hourlyData = [
  { hour: "10:00", sales: 1200 },
  { hour: "11:00", sales: 1800 },
  { hour: "12:00", sales: 2400 },
  { hour: "13:00", sales: 2200 },
  { hour: "14:00", sales: 1600 },
  { hour: "15:00", sales: 1400 },
  { hour: "16:00", sales: 1500 },
  { hour: "17:00", sales: 1800 },
  { hour: "18:00", sales: 2600 },
  { hour: "19:00", sales: 2800 },
  { hour: "20:00", sales: 2400 },
  { hour: "21:00", sales: 1600 },
];

// Sample data for sales by category
const categoryData = [
  { name: "Main Course", value: 48 },
  { name: "Appetizers", value: 22 },
  { name: "Beverages", value: 18 },
  { name: "Desserts", value: 12 },
];

// Colors for pie chart
const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

// Sample data for top selling dishes
const topSellingDishes = [
  { name: "Pad Thai", quantity: 42, revenue: 3780 },
  { name: "Green Curry", quantity: 36, revenue: 3960 },
  { name: "Tom Yum Goong", quantity: 28, revenue: 3360 },
  { name: "Mango Sticky Rice", quantity: 24, revenue: 1920 },
  { name: "Thai Iced Tea", quantity: 56, revenue: 1680 },
];

// Sample data for active tables
const activeTables = [
  {
    id: "A1",
    status: "Dining",
    occupancy: "2 guests",
    startTime: "12:30 PM",
    duration: "45m",
  },
  {
    id: "A2",
    status: "Dining",
    occupancy: "4 guests",
    startTime: "1:15 PM",
    duration: "20m",
  },
  {
    id: "B3",
    status: "Ordering",
    occupancy: "2 guests",
    startTime: "1:25 PM",
    duration: "10m",
  },
  {
    id: "VIP-1",
    status: "Dining",
    occupancy: "6 guests",
    startTime: "12:45 PM",
    duration: "30m",
  },
];

const Dashboard = () => {
  const todayRevenue = 14320;
  const totalOrders = 86;
  const averageOrderValue = Math.round(todayRevenue / totalOrders);
  const activeGuestsCount = activeTables.reduce((total, table) => {
    return total + parseInt(table.occupancy.split(" ")[0]);
  }, 0);

  return (
    <div>
      <div className="flex justify-between items-start mb-6 ">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Restaurant Dashboard
          </h1>
          <p className="text-gray-600">Today's Overview • May 11, 2025</p>
        </div>
        <div>
          <Tabs defaultValue="today" className="w-[300px]">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Today's Revenue"
          value={`${todayRevenue} ฿`}
          trend="+12.5%"
          trendDirection="up"
        />
        <SummaryCard
          title="Total Orders"
          value={totalOrders.toString()}
          trend="+5.2%"
          trendDirection="up"
        />
        <SummaryCard
          title="Average Order"
          value={`${averageOrderValue} ฿`}
          trend="+2.3%"
          trendDirection="up"
        />
        <SummaryCard
          title="Active Guests"
          value={activeGuestsCount.toString()}
          trend="14 tables"
          trendDirection="neutral"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Hourly Sales Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Hourly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={hourlyData}>
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    width={45}
                    tickFormatter={(value) => `${value / 1000}k`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => `${value} ฿`}
                      />
                    }
                  />
                  <Bar dataKey="sales" fill="#FF8042" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sales By Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales By Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
              {categoryData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Dishes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Selling Dishes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingDishes.map((dish) => (
                  <TableRow key={dish.name}>
                    <TableCell className="font-medium">{dish.name}</TableCell>
                    <TableCell className="text-right">
                      {dish.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {dish.revenue} ฿
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Tables */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTables.map((table) => (
                <div
                  key={table.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          table.status === "Dining"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      />
                      <span className="text-sm font-medium">
                        Table {table.id}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {table.occupancy} • Started {table.startTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{table.status}</div>
                    <div className="text-xs text-gray-500">
                      {table.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Staff Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Somchai</div>
                    <div className="text-xs text-gray-500">
                      Waiter • 14 orders
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">92%</div>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Nong</div>
                    <div className="text-xs text-gray-500">
                      Server • 12 orders
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">88%</div>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Ploy</div>
                    <div className="text-xs text-gray-500">
                      Waiter • 9 orders
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">75%</div>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Chai</div>
                    <div className="text-xs text-gray-500">
                      Chef • 24 dishes
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">96%</div>
                </div>
                <Progress value={96} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "13:45",
                  action: "New order received from Table A1",
                  status: "pending",
                },
                {
                  time: "13:42",
                  action: "Table B2 payment completed",
                  status: "success",
                },
                {
                  time: "13:38",
                  action: "Order for Table VIP-1 is ready",
                  status: "cooking",
                },
                {
                  time: "13:30",
                  action: "New table added: C4",
                  status: "info",
                },
                {
                  time: "13:25",
                  action: "Special discount applied to Table A2",
                  status: "info",
                },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div>
                    <span
                      className={`flex h-2 w-2 mt-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "pending"
                          ? "bg-yellow-500"
                          : activity.status === "cooking"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  trend,
  trendDirection,
}: {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold">{value}</h3>
            <span
              className={`text-sm flex items-center ${
                trendDirection === "up"
                  ? "text-green-600"
                  : trendDirection === "down"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {trendDirection === "up" && (
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
              {trendDirection === "down" && (
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {trend}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
