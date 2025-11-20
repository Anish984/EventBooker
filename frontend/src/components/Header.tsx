import { Separator } from "./ui/separator";
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
      <header className="sticky top-0 bg-whitez-10 shadow-md py-2">
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
      <Separator className="my-4 " />
    </div>
  );
};

export default Header;
