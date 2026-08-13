import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SidebarNavbar from "./SidebarNavbar";

export default function DoctorsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/doctor-dashboard/")[1] || "dashboard";

  const [userRole, setUserRole] = React.useState(
    () => localStorage.getItem("doctorTitle") || "Senior Cardiologist"
  );

  React.useEffect(() => {
    const sync = () =>
      setUserRole(localStorage.getItem("doctorTitle") || "Senior Cardiologist");
    window.addEventListener("doctorTitleChange", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("doctorTitleChange", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleNavigate = (id) => {
    if (id === "dashboard") {
      navigate("/doctor-dashboard");
    } else {
      navigate(`/doctor-dashboard/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarNavbar
        activeId={currentPath}
        onNavigate={handleNavigate}
        userName="Dr. Rajesh Malhotra"
        userRole={userRole}
        notificationCount={3}
      />
      <main className="md:ml-[264px] md:mt-16 mt-14 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}