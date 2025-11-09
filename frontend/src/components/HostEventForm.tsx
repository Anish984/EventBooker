import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const HostEventForm = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
  };

  return (
    <Card className="w-[450px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Host a New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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

          <div>
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

          <div>
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

          <Button type="submit" className="w-full mt-4">
            Create Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HostEventForm;