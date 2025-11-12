import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CreditCard, HomeIcon, LocationEdit } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface TicketDialogProps {
  title: string;
  location: string;
  date: string;
  price: number;
}

export function TicketDialog({
  title,
  location,
  date,
  price,
}: TicketDialogProps) {
  const [ticketCount, setTicketCount] = useState<number>(1);
  const totalAmount = price * ticketCount;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book Tickets</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Tickets</DialogTitle>
          <div className="flex gap-5 mt-5">
            <div>
              <img
                src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
                alt=""
                className="w-25 h-25 rounded-2xl"
              />
            </div>

            <div>
              <h3>{title}</h3>
              <div className="flex gap-2">
                <div>
                  <Calendar className="w-4" />
                </div>
                <div>
                  <DialogDescription>{date}</DialogDescription>
                </div>
              </div>

              <div className="flex gap-2">
                <LocationEdit className="w-4" />
                <DialogDescription>{location}</DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>
        <Separator className="mt-2" />

        <form className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Number of tickets</Label>
            {/* <Input id="name-1" name="name" defaultValue="Pedro Duarte" /> */}
            <Select onValueChange={(value) => setTicketCount(parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of tickets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10   ">10</SelectItem>
              </SelectContent>
            </Select>
            <Separator className="mt-2" />
          </div>
          <DialogDescription className="font-medium mb-1">
            Contact Information
          </DialogDescription>

          <div className="flex gap-3">
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="First Name"
                required
              />
            </div>

            <div>
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phonenumber">Phone Number</Label>
            <Input
              id="phonenumber"
              name="phonenumber"
              placeholder="Phone Number"
              required
            />
          </div>
          <Separator className="mt-2 mb-2" />

          <DialogDescription className="font-medium mb-1">
            Payment Summary
          </DialogDescription>
          <div className="flex justify-between">
            <Label htmlFor="Tickets" className="font-normal">
              Tickets ({ticketCount}x)
            </Label>

            <Label htmlFor="Tickets" className="font-normal">
              ₹{totalAmount}/-
            </Label>
          </div>

          <Separator />
          <div className="flex justify-between">
            <Label htmlFor="Tickets" className="font-semibold text-lg">
              Total
            </Label>

            <Label htmlFor="Tickets" className="font-semibold text-lg">
              ₹{totalAmount}/-
            </Label>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              <CreditCard />
              Proceed to Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
