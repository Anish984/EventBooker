import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-3xl ml-10">Event Booker</Label>
        </div>
        <div className="flex mt-3 mr-10">
          <Button className="ml-10 mt-3 mb-3" variant={"default"} onClick={()=>{navigate("/host-event")}}>
            Host Event
          </Button>
          <Button className="ml-3 mt-3 mb-3" variant={"outline"}>
            Registered Events
          </Button>
        </div>
      </div>
      <Separator className="my-4 " />
    </div>
  );
};

export default Header;
