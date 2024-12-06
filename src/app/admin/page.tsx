"use client";
import React from "react";
import { ProtectedRoute } from "@/components/ProtectRoute";
const Admin = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>Hello,Admin</div>
    </ProtectedRoute>
  );
};

export default Admin;
