"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ContentPrecenatge from "./ContentPrecenatge";
import TableDashboard from "./TableDashboard";
import { useQuery } from "@tanstack/react-query";
import { axiosIntence } from "../../lib/axiosIntence";

function DashBoardCountent() {
  const data: { month: string; users: number }[] = [];
  const { isLoading, data: usernalytics } = useQuery({
    queryKey: ["users_reports"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/reports/users/");

        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  usernalytics?.users?.lastmonths?.forEach((item: any) => {
    data.push({
      month: item.month,
      users: item.count,
    });
  });
  // orderalytics?.orders?.last12Month?.forEach((item: any) => {
  //   data.push({
  //     ...data,
  //     orders: item.count,
  //     month: item.month,
  //   });
  // });

  //   courseslytics?.courses?.last12Month?.forEach((item: any) => {
  //     somes.push({
  //       courses: item.count,
  //     });
  //   });

  return (
    <div className="w-full">
      <div className="shadow-md p-[20px] bg-white m-6">
        <h2 className="text-[19px]  font-semibold mb-4  ">
          Latest Transections
        </h2>
        <TableDashboard />
      </div>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <div className=" py-12 px-8  mb-12  flex mt-[20px]  gap-4  w-full justify-between">
          <div className="w-[100%] h-[300px] ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  tooltipType="none"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <ContentPrecenatge />
        </div>
      )}
    </div>
  );
}

export default DashBoardCountent;
