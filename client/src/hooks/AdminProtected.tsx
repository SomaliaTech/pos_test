"use client";

import { Navigate } from "react-router-dom";
import React from "react";

import useUserStore from "../lib/userStore";

interface Props {
  children: React.ReactNode;
}

function AdminProtected({ children }: Props) {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to={`/welcome/id`} replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default AdminProtected;
