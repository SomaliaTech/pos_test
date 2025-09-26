import DashboardHero from "../../../components/admin/DashboardHero";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import AlllUsersGrid from "../../../components/admin/dashboard/users/AllUserGrid";

function AllUsersPage() {
  return (
    <div>
      {/* <AdminProtected> */}
      {/* <Heading
          keywords="new course somalia, koorso cusub, Elearning webiste "
          title="Users Adminstrator"
          description="Best Teaching Tech in somaalia Website"
        /> */}
      <div className="flex">
        <div className="md:w-[18%] w-1/5 ">
          <AdminSidebar />
        </div>
        <div className="w-[85%] ">
          <DashboardHero />
          <div className=" mr-12">
            <AlllUsersGrid isTeam={false} />
          </div>
        </div>
      </div>
      {/* </AdminProtected> */}
    </div>
  );
}

export default AllUsersPage;
