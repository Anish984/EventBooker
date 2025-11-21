import { Label } from "./ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";
import EventCard from "./EventCard";
import { useState } from "react";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

      {/* Hardcoded list of events */}
      <div className="flex flex-wrap justify-center gap-8 mb-10">
        <EventCard
          id="2"
          title="REC Hacks"
          location="REC Chennai"
          date="1 Jan 2026"
        />
        <EventCard
          id="3"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
        />
        <EventCard
          id="4"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
        />
        <EventCard
          id="5"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
        />
        <EventCard
          id="6"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
        />
        <EventCard
          id="7"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
        />
      </div>
    </div>
  );
};

export default Events;
