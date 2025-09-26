"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useEffect, useState } from "react";
import { format } from "timeago.js";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };

function TableDashboard() {
  const [transections, setTransections] = useState<any[]>([]);
  const isLoading = false;
  const data = [
    {
      id: "123456",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      productName: "Product A",
      userName: "Ahmed Ali",
      date: "2025-09-12",
      price: "$25",
      paymentMethod: "Credit Card",
      status: "Delivered",
    },
    {
      id: "123457",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      productName: "Product B",
      // userName: "Fadumo Hassan",
      date: "2025-09-10",
      price: "$40",
      paymentMethod: "PayPal",
      status: "Pending",
    },
    {
      id: "123458",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      productName: "Product C",
      userName: "Mohamed Yusuf",
      date: "2025-09-11",
      price: "$30",
      paymentMethod: "Credit Card",
      status: "In Transit",
    },
    {
      id: "123459",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      productName: "Product D",
      userName: "Asha Abdi",
      date: "2025-09-09",
      price: "$50",
      paymentMethod: "Cash on Delivery",
      status: "Cancelled",
    },
    {
      id: "123460",
      image: "https://randomuser.me/api/portraits/men/66.jpg",
      productName: "Product E",
      userName: "Ismail Warsame",
      date: "2025-09-08",
      price: "$60",
      paymentMethod: "Credit Card",
      status: "Delivered",
    },
    {
      id: "123461",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      productName: "Product F",
      userName: "Nadifo Mohamed",
      date: "2025-09-07",
      price: "$35",
      paymentMethod: "PayPal",
      status: "Pending",
    },
    {
      id: "123462",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
      productName: "Product G",
      userName: "Hassan Sheikh",
      date: "2025-09-06",
      price: "$45",
      paymentMethod: "Credit Card",
      status: "In Transit",
    },
    {
      id: "123463",
      image: "https://randomuser.me/api/portraits/women/27.jpg",
      productName: "Product H",
      userName: "Halima Omar",
      date: "2025-09-05",
      price: "$55",
      paymentMethod: "Cash on Delivery",
      status: "Delivered",
    },
  ];

  useEffect(() => {
    setTransections(data);
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>loading ...</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "white",
              boxShadow: "none",
              border: "none",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow className="max-w-[95%]">
                <TableCell className="tableCell">Tracking ID</TableCell>
                <TableCell className="tableCell">Image</TableCell>

                <TableCell className="tableCell">Users Name</TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Price</TableCell>
                <TableCell className="tableCell">Payment Method</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transections?.slice(0, 4)?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>#{row.id}</TableCell>

                  <TableCell className="">
                    <img
                      src={row.image}
                      width={32}
                      height={32}
                      alt="then"
                      className="w-[32px] h-[32px] object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{row.productName}</TableCell>
                  {row.userName && <TableCell>{row.userName}</TableCell>}
                  <TableCell>{format(row.date)}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        row.status == "Delivered"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } px-4 py-2  text-white rounded  text-[17px]`}
                    >
                      {row.status === "Delivered"
                        ? "Not successful"
                        : "Successfuly"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default TableDashboard;
