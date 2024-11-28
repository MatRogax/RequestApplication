import Button from "../../ui/Button";

const Header = () => {
  return (
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between py-6 px-4 mx-10 ml-8 mr-28">
        <div className="flex items-center">
          <img className="h-8 w-auto" src="" alt="Logo" />
          <h1 className="ml-2 text-2xl text-sky-600 font-bold">SuperMarket</h1>
        </div>
        <div className="flex justify-center flex-auto">
          <input
            type="text"
            placeholder="Search menu..."
            className="p-2 border border-gray-300 rounded-xl w-3/4"
          />
        </div>
        <div className="flex items-center space-x-8 ml-0">
          <button className="text-gray-600 hover:text-sky-600 font-bold">
            Chat
          </button>
          <button className="text-gray-600 hover:text-sky-600 font-bold">
            More
          </button>
          <Button className="">
            <i>Icon</i>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
