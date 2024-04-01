"use client";

import AdminDashboardUi from "@/components/admin-dashboard/AdminDasboardUi";
import AdminLogin from "@/components/admin-dashboard/AdminLogin";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";



const AdminDashboard = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  return (
    <main className="">
       {/* {
        isAdminLoggedIn ?  AdminDashboardUi() : <AdminLogin />
       } */}
       <AdminLogin />
    </main>
  );
};

export default AdminDashboard;
