import { Label } from "./ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  address: string;
  price?: number;
}

const Events = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/events");
      setEvents(res.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    // Refetch events every 5 seconds
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className="m-auto mt-10 mb-18">
          <Label className="text-7xl font-extrabold">Discover Events Around You</Label>
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

      {/* List of events here */}
      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {/* {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => (
            <EventCard
              id={ev.id}
              title={ev.title}
              location={ev.address}
              date={ev.date}
              price="200"
            />
          ))
        ) : (
          <p>No events found</p>
        )} */}
        <EventCard
          id="2"
          title="REC Hacks"
          location="REC Chennai"
          date="1 Jan 2026"
          price="300"
        />
        <EventCard
          id="3"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
          price="400"
        />
        <EventCard
          id="4"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
          price="500"
        />

        <EventCard
          id="5"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
          price="500"
        />

        <EventCard
          id="6"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
          price="500"
        />

        <EventCard
          id="7"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
          price="500"
        />
      </div>
    </div>
  );
};

export default Events;
