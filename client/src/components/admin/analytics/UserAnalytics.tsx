import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { axiosIntence } from "../../../lib/axiosIntence";

type Props = {
  isDashbord: boolean;
};

function UsersAnalytics({ isDashbord }: Props) {
  const { isLoading, data: usernalytics } = useQuery({
    queryKey: ["users_reports"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/reports/users/");

        return res.data?.users;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const data: any[] = [];

  usernalytics?.lastmonths?.forEach((item: any) => {
    data.push({
      month: item.month,
      users: item.count,
    });
  });

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="h-screen">
          {!isDashbord && (
            <div className="flex flex-col gap-4">
              <h2>Users Anlaytics</h2>
              <p className="text-xl font-sans font-semibold">
                Last 12 Montsh Analatics data
              </p>
            </div>
          )}
          <div
            className={`${
              isDashbord ? "w-fll h-[50%]  mt-52  " : "w-[100%] h-full"
            }  flex justify-center items-center w-full`}
          >
            <ResponsiveContainer
              width={isDashbord ? "100%" : "100%"}
              height={isDashbord ? "90%" : "50%"}
            >
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="month" />
                <YAxis />

                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersAnalytics;
