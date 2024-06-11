"use client";

import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
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
      <MaxwidthWrapper>
        <AdminLogin />
      </MaxwidthWrapper>
    </main>
  );
};

export default AdminDashboard;
