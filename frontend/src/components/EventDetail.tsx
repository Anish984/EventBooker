import Header from "./Header";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Calendar, LocationEditIcon } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate(); 

  const handleBuyTicket = () => {
    navigate(`/event/${id}/book` , {state : {title, location, date, price}});
  }
  
  const { title, location, date, price } = state || {};
  return (
    <div>
      <Header />
      <Card className="m-10 rounded-lg overflow-hidden w-3/4 m-auto">
        <img
          className="h-100 w-full object-cover object-center"
          src="https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg"
          alt=""
        />
      </Card>

      <Card className="w-3/4 m-auto p-6 mt-5">
        <Badge variant={"default"}>Hackathon</Badge>
        <div className="flex justify-between mr-7">
          <CardTitle className="text-4xl mt-2 mb-2">{title}</CardTitle>
          <Badge className="font-bold text-xl" variant={"secondary"}>
            ₹{price}/-
          </Badge>
        </div>

        <div className="flex justify-between ">
          <div>
            <div className="flex">
              <Calendar className="w-5" />
              <CardContent className="">{date}</CardContent>
            </div>

            <div className="flex -mt-5">
              <LocationEditIcon className="w-5" />
              <CardContent className="">{location}</CardContent>
            </div>
          </div>
          <div>
            <Button variant={"default"}  onClick={handleBuyTicket}>Buy ticket</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventDetail;
