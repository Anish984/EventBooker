// Events.tsx
import { Label } from "./ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface EventType {
  _id: string;
  title: string;
  date: string;
  address: string;
  organizer: string;
  eventPic: string;
  description:string;
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/events", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setEvents(res.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((ev) => {
    const term = searchTerm.toLowerCase();
    return (
      ev.title.toLowerCase().includes(term) ||
      ev.address.toLowerCase().includes(term) ||
      ev.organizer.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="m-auto mt-10 mb-18">
          <h1 className="text-8xl font-extrabold text-center">
            Discover Events
          </h1>
          <h1 className="text-8xl font-extrabold text-center">Around You</h1>
        </div>
      </div>

      <div className="mr-10 mt-5">
        <InputGroup className="h-15 w-3/4 m-auto shadow-lg">
          <InputGroupInput
            placeholder="Search Events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="mt-20 -mb-5">
        <Label className="text-5xl font-bold ml-36">Ongoing</Label>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-10 min-h-[200px]">
        {loading ? (
          <p>Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => {
            const readableDate = new Date(ev.date).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <EventCard
                key={ev._id}
                id={ev._id}
                title={ev.title}
                location={ev.address}
                description={ev.description}
                date={readableDate}
                eventPic={ev.eventPic}
                organizer={ev.organizer}
              />
            );
          })
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default Events;
