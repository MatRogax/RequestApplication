import Button from "../../ui/Button";
import * as Lucide from "lucide-react";

const Header = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between py-4 pl-4 ">
        <div className="flex items-center hover:cursor-pointer hover:scale-105 transition-transform">
          <Lucide.AlignLeft className="text-blue-950" size={25} />
          <h1 className="ml-2 text-2xl text-blue-950 font-bold">SuperMarket</h1>
        </div>

        <div className="hidden md:flex justify-center flex-auto">
          {/* <input
            type="text"
            placeholder="Search menu..."
            className="p-2 border border-gray-300 rounded-lg w-3/4 focus:ring-2 focus:ring-blue-950 focus:outline-none"
          /> */}
        </div>

        <div className="flex items-center space-x-4 mx-10">
          <div className="flex items-center space-x-4">
            <Button className="group flex items-center justify-center p-2 bg-slate-100 rounded-full hover:bg-blue-950 transition-all duration-200">
              <Lucide.ShoppingBagIcon
                className="text-blue-950 group-hover:text-white transition-all duration-200"
                size={20}
              />
            </Button>
            <Button className="group flex items-center justify-center p-2 bg-slate-100 rounded-full hover:bg-blue-950 transition-all duration-200">
              <Lucide.MessageCircle
                className="text-blue-950 group-hover:text-white transition-all duration-200"
                size={20}
              />
            </Button>
            <Button className="group flex items-center justify-center p-2 bg-slate-100 rounded-full hover:bg-blue-950 transition-all duration-200">
              <Lucide.Grip
                className="text-blue-950 group-hover:text-white transition-all duration-200"
                size={20}
              />
            </Button>
          </div>

          <div className="flex items-center space-x-4 pl-4">
            <button className="text-blue-950 font-semibold hover:text-blue-900 hover:scale-110 transition-all duration-200">
              Sign up
            </button>
            <button className="bg-blue-950 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-200">
              Log in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
