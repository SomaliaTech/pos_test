import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ContentPrecenatge() {
  const [usersPrecentages, setUsersPrecentages] = useState<any>({});
  const [ordersPrecentages, setOrdersPrecentages] = useState<any>({});

  // const orderalytics = orders && orders;

  // const useralytics = users && users;

  // useEffect(() => {
  //   // if (isLoading && userLoading) {
  //   //   return;
  //   // }

  //   if (useralytics && orderalytics) {
  //     const userLast2Month = useralytics?.users?.lastmonths?.slice(-2);
  //     const orderLast2Month = orderalytics?.orders?.lastmonths.slice(-2);

  //     if (orderLast2Month.length === 2 && userLast2Month.length === 2) {
  //       const currentMonthuser = userLast2Month[1].count;
  //       const prevMonthUser = userLast2Month[0].count;
  //       const prevMonthOrder = orderLast2Month[0].count;
  //       const currentMonthOrder = orderLast2Month[1].count;

  //       const orderPrecentage =
  //         prevMonthOrder !== 0
  //           ? ((currentMonthOrder - prevMonthOrder) / prevMonthOrder) * 100
  //           : +100;
  //       const userPrecentage =
  //         prevMonthUser !== 0
  //           ? ((currentMonthuser - prevMonthUser) / prevMonthUser) * 100
  //           : +100;

  //       setOrdersPrecentages({
  //         currentmont: currentMonthOrder,
  //         prevMonth: prevMonthOrder,
  //         precentage: orderPrecentage,
  //       });
  //       setUsersPrecentages({
  //         currentmont: currentMonthuser,
  //         prevMonth: prevMonthUser,
  //         precentage: userPrecentage,
  //       });
  //     }
  //   }
  // }, [orderalytics, useralytics, userLoading, isLoading]);

  return (
    <div className="flex h-[300px] items-end  gap-4  ">
      <div className="border-1 flex h-[200px] min-w-[250px] flex-col justify-between text-white bg-[#383838] shadow-md rounded-md flex-1 py-2 px-3">
        <div className="flex items-center justify-between w-full">
          <span>NEW USERS </span>
          <div className="flex items-center gap-1 text-green-500">
            {usersPrecentages.precentage > 0 ? (
              <FaChevronUp size={22} color="green" />
            ) : (
              <FaChevronDown size={22} color="red" />
            )}
            <span
              style={{
                color: usersPrecentages.precentage > 0 ? "green" : "red",
              }}
            >
              {usersPrecentages.precentage > 0
                ? "+" + usersPrecentages?.precentage?.toFixed(2)
                : usersPrecentages?.precentage?.toFixed(2)}
              %
            </span>
          </div>
        </div>
        <h2 className="text-xl">
          {usersPrecentages?.currentmont !== 0
            ? usersPrecentages.currentmont
            : "0"}
        </h2>
        <div className="flex items-center justify-between w-full">
          <Link to={"teacher/course-analytics"} className="underline pb-2">
            See all users
          </Link>
          <div
            className={`flex items-center  ${
              usersPrecentages.precentage > 0 ? "bg-[#383838]" : "bg-red-500"
            } gap-1 text-green-500 py-2 px-4 rounded-md `}
          >
            <FaUser size={22} color="green" />
          </div>
        </div>
      </div>
      <div
        className={`border-1 flex h-[200px] min-w-[250px] flex-col justify-between text-white  bg-[#383838] shadow-md rounded-md flex-1 py-2 px-3`}
      >
        <div
          onClick={() => setOrdersPrecentages(ordersPrecentages)}
          className="flex items-center justify-between w-full"
        >
          <span>ORDERS</span>
          <div className="flex items-center gap-1 text-green-500">
            {ordersPrecentages.precentage > 0 ? (
              <FaChevronUp size={22} color="green" />
            ) : (
              <FaChevronDown size={22} color="red" />
            )}
            <span
              style={{
                color: ordersPrecentages.precentage > 0 ? "green" : "red",
              }}
            >
              {ordersPrecentages.precentage > 0
                ? "+" + ordersPrecentages?.precentage?.toFixed(2)
                : ordersPrecentages?.precentage?.toFixed(2)}
              %
            </span>
          </div>
        </div>
        <h2 className="text-xl">{ordersPrecentages.currentmont}</h2>
        <div
          onClick={() => setUsersPrecentages(usersPrecentages)}
          className="flex items-center justify-between w-full"
        >
          <Link to={"teacher/orders-analytics"} className="underline pb-2">
            View all Orders
          </Link>
          <div className="flex items-center gap-1 text-green-500 py-2 px-4 rounded-md bg-gray-400">
            <FaChartColumn size={22} color="green" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentPrecenatge;
