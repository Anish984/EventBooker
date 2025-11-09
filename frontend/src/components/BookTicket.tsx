import React, { useState } from "react";
import Header from "./Header";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { useLocation } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

const BookTicket = () => {
  const { state } = useLocation();
  const event = state || {};
  const [quantity, setQuantity] = useState(1);
  const price = event?.price || 0;
  const totalPrice = price * quantity;

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div>
      <Header />

      {/* Main div */}
      <div className="flex justify-around w-3/4 m-auto mt-10 space-x-10">
        <div>
          <Card className="w-96 p-6">
            <CardHeader className="font-bold text-3xl">Summary</CardHeader>
            <CardContent className="text-lg space-y-4">
              <CardDescription className="font-medium text-2xl mt-3">
                Event: {event.title}
              </CardDescription>
              <CardDescription className="font-medium text-2xl mt-3">
                Location: {event.location}
              </CardDescription>
              <CardDescription className="font-medium text-2xl mt-3">
                Date: {event.date}
              </CardDescription>
              <CardDescription className="font-medium text-2xl mt-3">
                Price: ₹{event.price}/-
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Ticket div */}
        <div>
          <Card className="p-10 w-96 ">
            <span className="block mb-4 text-2xl font-bold">
              Ticket Quantity
            </span>
            <div className="flex"> 
              <div>
                <Button disabled={quantity === 1} onClick={handleDecrease}>
                  <Minus />
                </Button>
              </div>
              <div>
                <span className="mx-4 text-xl">{quantity}</span>
              </div>
              <div>
                <Button onClick={handleIncrease} disabled={quantity === 10}>
                  <Plus />
                </Button>
              </div>
            </div>

            <span className="block mt-6 text-xl font-semibold">
              Total ₹{totalPrice}/-
            </span>

            <Button className="mt-6 w-full" variant={"default"}>
              Confirm Booking
            </Button>   
          </Card>
        </div>


      </div>
      {/* // Container div */}
    </div>
  );
};

export default BookTicket;
