import UsersAnalytics from "../../components/admin/analytics/UserAnalytics";
import DashboardHeader from "../../components/admin/DashboardHeader";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";

const UserAnalyticsPage = () => {
  return (
    <>
      <div className="flex">
        <div className="md:w-[18%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[80%]">
          <DashboardHeader />
          <UsersAnalytics isDashbord={false} />
        </div>
      </div>
    </>
  );
};

export default UserAnalyticsPage;
