import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToHome from "./BackToHome";

const HostEventForm = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    description: "",
  });

  const [eventPic, setEventPic] = useState<File | null>(null); // 👈 image state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventPic(e.target.files[0]); // 👈 save selected file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 👇 Use FormData instead of normal object
      const formData = new FormData();
      formData.append("title", eventData.name);
      formData.append("description", eventData.description);
      formData.append("date", eventData.date);
      formData.append("address", eventData.location);
      formData.append("price", eventData.price);
      formData.append("organizer", localStorage.getItem("userId") || "");

      if (eventPic) {
        formData.append("eventPic", eventPic); // 👈 name must match backend field
      }

      const res = await axios.post(
        "http://localhost:3000/api/createEvent",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ Don't manually set Content-Type; axios will set multipart/form-data with correct boundary
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
            <Input
              type="file"
              id="picture"
              accept="image/*"
              onChange={handleFileChange} // 👈 handle file change
            />
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
            <Label htmlFor="price">Ticket Price (₹)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={eventData.price}
              onChange={handleChange}
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
      <BackToHome/>
    </Card>
  );
};

export default HostEventForm;