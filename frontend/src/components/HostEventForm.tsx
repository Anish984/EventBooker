import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HostEventForm = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const handleClick = ()=>{
  //   navigate("/home")
  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const newEvent = {
        title: eventData.name,
        description: eventData.description,
        date: eventData.date,
        address: eventData.location,
        organizer: localStorage.getItem("userId"),
      };

      const res = await axios.post(
        "http://localhost:3000/api/createEvent",
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Event Created Successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[450px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Host a New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-5">
            <Label htmlFor="picture">Upload Event poster</Label>
            <Input type="file" id="picture" accept="image/*" />
          </div>
          <div className="mb-5">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter event name"
              value={eventData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Write about your event..."
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HostEventForm;