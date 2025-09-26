"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { FaDeleteLeft } from "react-icons/fa6";

import { format } from "timeago.js";

import { MdEmail } from "react-icons/md";
import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axiosIntence } from "../../../../lib/axiosIntence";

type Props = {
  isTeam: boolean;
};

function AlllUsersGrid({ isTeam }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["users_gas"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/user/");
        console.log(res.data);
        return res?.data?.users;
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log("data", data?.users);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [change, setChange] = useState("user");
  const [active, setActive] = useState(false);
  console.log(userId, change);
  const handleDelete = async () => {
    // await deleteUser(userId);
  };
  const handleUpdateRole = async () => {
    // await updateRole({ email, role: change });
  };
  const [open, setOpen] = useState(false);
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name ", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "total", headerName: "Total Debt", flex: 0.3 },
    { field: "created_at", headerName: "Created_at", flex: 0.5 },
    {
      field: "",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (prams: any) => (
        <div
          onClick={() => {
            setOpen(!open);
            setUserId(prams.row.id);
          }}
          className="h-full flex items-center justify-center"
        >
          <FaDeleteLeft
            size={17}
            color="red"
            className="cursor-pointer ml-2 text-center"
          />
        </div>
      ),
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.5,
      renderCell: (prams: any) => (
        <a
          href={`mailto:${prams?.row?.email}`}
          className="h-full flex items-center justify-center"
        >
          <MdEmail
            size={17}
            color="green"
            className="cursor-pointer ml-2 text-center"
          />
        </a>
      ),
    },
  ];

  interface IRows {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: Date | string;
    total: number;
  }
  const rows: IRows[] = [];
  if (isTeam) {
    const members = data?.filter((item: any) => item.role === "teacher");
    members?.map((item: any) =>
      rows.push({
        id: item._id,
        name: item.name,
        total: item.totalDebt,
        email: item.email,
        role: item.role,
        created_at: format(item.createdAt),
      })
    );
  } else {
    data?.map((item: any) =>
      rows.push({
        id: item._id,
        name: item.name,
        total: Number(`$${item.totalDebt}`),
        email: item.email,
        role: item.role,
        created_at: format(item.createdAt),
      })
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-red-500 h-full w-full text-4xl text-white rounded-md">
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <>
      {isTeam && (
        <div
          onClick={() => setActive(!active)}
          className="flex justify-end mb-4"
        >
          <button className="flex cursor-pointer items-center justify-center w-[200px] py-2 px-1 rounded text-black m bg-white">
            Add New Member
          </button>
        </div>
      )}
      <div className="w-full  m-auto bg-gray-100 mx-8 ">
        <Box
          sx={{
            height: 600,
            width: "100%",
            "&>.MuiDataGrid-main": {
              "&>.MuiDataGrid-columnHeaders": {
                borderBottom: "none",
              },

              "& div div div div >.MuiDataGrid-cell": {
                borderBottom: "none",
              },
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            autoPageSize
            checkboxSelection
            disableRowSelectionOnClick
          />
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{}}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white flex flex-col items-center justify-center px-4 py-6 rounded-md "
              >
                <h1
                  id="modal-modal-title"
                  className="text-center text-[30px] font-semibold"
                >
                  Add New User
                </h1>

                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  style={{
                    outline: "none",
                    border: "solid 0.5px #819191",
                    width: 300,
                    marginTop: 20,
                  }}
                  placeholder="Enter the email Address"
                  className="w-full py-3 px-1 rounded outline bg-transparent border-none"
                />
                <select
                  className="w-full py-3 mt-6 mb-4 px-1 rounded outline bg-transparent border-none"
                  name=""
                  onChange={(e) => setChange(e.target.value)}
                  id=""
                >
                  <option value="user">Student</option>
                  <option value="teacher">Teacher</option>
                </select>

                <div
                  onClick={handleUpdateRole}
                  className="flex items-center justify-center mb-6 bg-green-400 w-full cursor-pointer text-white rounded py-2"
                >
                  Submit
                </div>
              </Box>
            </Modal>
          )}
          {open && (
            <Modal
              open={open}
              onClose={() => setActive(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{}}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white flex flex-col items-center justify-center px-4 py-6 rounded-md "
              >
                <h1
                  id="modal-modal-title"
                  className="text-center text-[30px] font-semibold "
                >
                  Are You Sure you want to <br /> Delete this User
                </h1>
                <div className="flex w-full justify-between items-center mt-8 mb-4">
                  <div
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center bg-red-400 w-[150px] cursor-pointer text-white rounded py-2"
                  >
                    Cencel
                  </div>
                  <div
                    onClick={handleDelete}
                    className="flex items-center justify-center bg-green-400 w-[150px] cursor-pointer text-white rounded py-2"
                  >
                    {/* {deleteLoading ? "loading...." : "DELETE"} */}
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      </div>
    </>
  );
}

export default AlllUsersGrid;
