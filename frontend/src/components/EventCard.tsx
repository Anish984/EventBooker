import logo from "../assets/react.svg";
import {
  Card,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Calendar, LocationEditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

type Props = {
  id: string;
  title: string;
  location: string;
  date: string;
  price: string;
};
const EventCard = ({ id, title, location, date, price }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${id}`, { state: { id, title, location, date, price } });
  };
  return (
    <div>
      <Card
        className="w-60 m-4 p-4 cursor-pointer
  transform-gpu transition-shadow transition-border
  duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
  hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:border-blue-400/40"
        onClick={handleClick}
      >
        <img src={logo} alt="gg" className="w-40 h-40 m-5" />
        <CardTitle className="text-xl">{title}</CardTitle>

        <div className="flex justify-between">
          <div>
            <div className="flex gap-2 mt-2">
              <LocationEditIcon className="w-5" />
              <CardDescription>{location}</CardDescription>
            </div>

            <div className="flex gap-2 mt-2">
              <Calendar className="w-5" />
              <CardDescription>{date}</CardDescription>
            </div>
          </div>
          <div>
            <Badge className="h-9 text-"   variant={"secondary"}>
              ₹{price}/-
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventCard;
