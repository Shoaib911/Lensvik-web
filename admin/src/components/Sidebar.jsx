import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 pr-4">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={"flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-lg bg-gray-200"}
          to={"/add"}
        >
          <img className="w-6 h-6" src={assets.add_icon} alt="Add Items" />
          <p className="hidden text-lg font-semibold md:block">Add Items</p>
        </NavLink>

        <NavLink
          className={"flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-lg bg-gray-200"}
          to={"/list"}
        >
          <img className="w-6 h-6" src={assets.parcel_icon} alt="List Items" />
          <p className="hidden text-lg font-semibold md:block">List Items</p>
        </NavLink>

        <NavLink
          className={"flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-lg bg-gray-200"}
          to={"/orders"}
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="View Orders" />
          <p className="hidden text-lg font-semibold md:block">View Orders</p>
        </NavLink>

        <NavLink
          className={"flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-lg bg-gray-200"}
          to={"/delivered-orders"}
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="Delivered Orders" />
          <p className="hidden text-lg font-semibold md:block">Delivered Orders</p>
        </NavLink>

        <NavLink
          className={"flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-2 rounded-lg bg-gray-200"}
          to={"/try-on-testing"}
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="Try On Testing" />
          <p className="hidden text-lg font-semibold md:block">Try-On Testing</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
