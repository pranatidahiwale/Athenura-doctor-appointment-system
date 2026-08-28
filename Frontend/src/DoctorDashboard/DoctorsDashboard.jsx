import React from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import SidebarNavbar from "./SidebarNavbar";

export default function DoctorsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/doctor-dashboard/")[1] || "dashboard";

  const [userRole, setUserRole] = React.useState(
    () => localStorage.getItem("doctorTitle") || "Senior Cardiologist"
  );
  const [userName, setUserName] = React.useState(
    () => localStorage.getItem("doctorName") || "Dr. Rajesh Malhotra"
  );
  const [userAvatar, setUserAvatar] = React.useState(
    () => localStorage.getItem("doctorPhoto") || "https://i.ibb.co/bRyPh259/Atharv.png"
  );

  React.useEffect(() => {
    const syncTitle = () =>
      setUserRole(localStorage.getItem("doctorTitle") || "Senior Cardiologist");
    const syncName = () =>
      setUserName(localStorage.getItem("doctorName") || "Dr. Rajesh Malhotra");
    const syncPhoto = () =>
      setUserAvatar(localStorage.getItem("doctorPhoto") || "https://i.ibb.co/bRyPh259/Atharv.png");

    window.addEventListener("doctorTitleChange", syncTitle);
    window.addEventListener("doctorNameChange", syncName);
    window.addEventListener("doctorPhotoChange", syncPhoto);
    window.addEventListener("storage", () => {
      syncTitle();
      syncName();
      syncPhoto();
    });
    return () => {
      window.removeEventListener("doctorTitleChange", syncTitle);
      window.removeEventListener("doctorNameChange", syncName);
      window.removeEventListener("doctorPhotoChange", syncPhoto);
    };
  }, []);

  const handleNavigate = (id) => {
    if (id === "dashboard") {
      navigate("/doctor-dashboard");
    } else {
      navigate(`/doctor-dashboard/${id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctorTitle");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("doctorPhoto");
    navigate("/login", { replace: true });
  };

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarNavbar
        activeId={currentPath}
        onNavigate={handleNavigate}
        userName={userName}
        userRole={userRole}
        userAvatar={userAvatar}
        notificationCount={3}
        onLogout={handleLogout}
      />
      <main className="md:ml-[264px] md:mt-16 mt-14 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}