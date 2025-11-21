import Header from "./Header";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Calendar, LocationEditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import BackToHome from "./BackToHome";

const EventDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id, title, location, date, description,eventPic} = state || {};
 

  const handleRegister = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please login to register for events");
        navigate("/");
        return;
      }

      // Call your backend API to create a booking
      const res = await axios.post(
        "https://eventbooker.onrender.com/api/registerNewEvent",
        {
          eventId: id,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert(
          "✅ Approval has been requested! You'll be notified once the organizer reviews your registration."
        );
        navigate("/home");
      }
    } catch (error: any) {
      console.error("Error registering for event:", error);
      if(error.response?.status===401){
        alert("update ID card,college name before trying to register");
      }
      if (error.response?.status === 400) {
        alert("You have already registered for this event!");
      } else {
        alert("Failed to register for event. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Card className="rounded-lg overflow-hidden w-3/4 m-auto">
        <img
          className="h-100 w-full object-cover object-center"
          src={eventPic || "https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg"}
          alt=""
        />
      </Card>

      <Card className="w-3/4 m-auto p-6 mt-5">
        <Badge variant={"default"}>Hackathon</Badge>
        <div className="flex justify-between mr-7">
          <CardTitle className="text-4xl mt-2 mb-2">{title}</CardTitle>
        </div>
        <div className="mt-5">
          <CardContent>
            <p className="text-base text-muted-foreground leading-relaxed">
              {description || "No description available."}
            </p>
          </CardContent>
        </div>

        <div className="flex justify-between mt-5">
          <div>
            <div className="flex">
              <Calendar className="w-4.5" />
              <CardContent className="">{date}</CardContent>
            </div>

            <div className="flex -mt-5">
              <LocationEditIcon className="w-4.5" />
              <CardContent className="">{location}</CardContent>
            </div>
          </div>
          <div>
            <Button
              variant={"default"}
              className="w-40 h-10 m-auto"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </div>
        <BackToHome/>
      </Card>
    </div>
  );
};

export default EventDetail;
