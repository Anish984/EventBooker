import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/host-event");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }
  return (
    <div>
      <header className="sticky top-0 mb-7 pb-7 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/50 py-2 z-50 backdrop-blur-sm border-b dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <Label
              className="text-3xl ml-10 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Event Booker
            </Label>
          </div>
          <div className="flex items-center gap-3 mr-10">
            <ModeToggle />
            <Button
              className="cursor-pointer"
              variant={"default"}
              onClick={handleClick}
            >
              Host Event
            </Button>
            <Button
              className="cursor-pointer"
              variant={"outline"}
              onClick={() => navigate("/my-events")}
            >
              My Events
            </Button>
            <Button
              className="cursor-pointer"
              variant={"outline"}
              onClick={() => navigate("/registered")}
            >
              Registered Events
            </Button>
            <Button
              className="cursor-pointer"
              variant={"outline"}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Avatar
              className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={handleProfileClick}
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
