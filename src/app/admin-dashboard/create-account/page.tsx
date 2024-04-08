"use client";

import AdminDashboardUi from "@/components/admin-dashboard/AdminDasboardUi";
import AdminLogin from "@/components/admin-dashboard/AdminLogin";
import AdminLogin2 from "@/components/admin-dashboard/AdminLogin2";
import AdminSignup from "@/components/admin-dashboard/AdminSignup";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";



const AdminDashboard = () => {

  return (
    <main className="">
      <div>
        <AdminSignup />
      </div>
    </main>
  );
};

export default AdminDashboard;
