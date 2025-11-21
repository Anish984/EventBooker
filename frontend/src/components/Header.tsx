import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/host-event");
  };
  return (
    <div>
      <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/50 py-2 z-50 backdrop-blur-sm border-b dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <Label className="text-3xl ml-10">Event Booker</Label>
          </div>
          <div className="flex mt-3 mr-10">
            <ModeToggle />
            <Button
              className="ml-10 mt-3 mb-3 cursor-pointer"
              variant={"default"}
              onClick={handleClick}
            >
              Host Event
            </Button>
            <Button
              className="ml-3 mt-3 mb-3 cursor-pointer"
              variant={"outline"}
            >
              Registered Events
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
