import { Input } from "../Input";
import { Button } from "../Button";
import { FiMenu, FiSearch } from "react-icons/fi";
import AdminProfile from "./AdminProfile";

const HeaderAdmin = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        {/* Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="lg:hidden p-2 border rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu className="w-5 h-5 text-gray-800 dark:text-white" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <form className="w-full">
            <div className="relative">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2"
              />
              {/* Search Icon */}
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <AdminProfile tier="Admin" avios={0} qpoints={0}
          ></AdminProfile>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
