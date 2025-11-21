import { Card, CardDescription, CardTitle } from "./ui/card";
import { Calendar, LocationEditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  location: string;
  date: string;
};

const EventCard = ({ id, title, location, date }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${id}`, { state: { id, title, location, date } });
  };

  return (
    <div>
      <div
        className="transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={handleClick}
      >
        <img
          src="https://images.pexels.com/photos/7307566/pexels-photo-7307566.jpeg"
          alt="gg"
          className="w-70 h-85 m-auto mt-15 rounded-xl"
        />
        <Card className="w-65 m-4 -mt-14 p-4 transform-gpu transition-shadow">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 mt-2">
              <Calendar className="w-4.5" />
              <CardDescription>{date}</CardDescription>
            </div>

            <div className="flex gap-1 mt-2">
              <LocationEditIcon className="w-4.5" />
              <CardDescription>{location}</CardDescription>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventCard;
