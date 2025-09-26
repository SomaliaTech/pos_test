import { useEffect } from "react";

import LeftMenu from "../../components/shared/LeftMenu";
import TableDetails from "../../components/table/TableDetails";
const TableDetailsPage = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  //   const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#E7EAE7]  h-screen tex- overflow-hidden flex gap-3">
      <div className="w-20 md:w-64 flex-shrink-0">
        <LeftMenu />
      </div>
      {/* Left Div */}
      <div className="flex-3 ">
        <TableDetails />
      </div>
    </section>
  );
};

export default TableDetailsPage;
