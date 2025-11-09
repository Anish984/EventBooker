import { Label } from "./ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="mt-5">
          <Label className="text-2xl ml-10 mt-5 ">Available Events</Label>
        </div>
        <div className="mr-10 mt-5">
          <InputGroup className="w-70 h-10">
            <InputGroupInput placeholder="Search Events" />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* List of events here */}
      <div className="flex flex-wrap justify-center">
        <EventCard
          id="1"
          title="Chennai expo"
          location="Vandalur"
          date="10th Sep 2025"
          price="200"
        />
        <EventCard
          id="2"
          title="REC Hacks"
          location="Rajalakshmi Engineering College"
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
