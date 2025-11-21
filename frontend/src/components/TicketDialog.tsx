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
import { Calendar, CreditCard, LocationEdit } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      ticketCount: 1,
      eventTitle: title,
      eventDate: date,
      eventLocation: location,
    },
  });

  const onSubmit = (data: any) => {
    navigate("/event/:id/qr", { state: data }); 
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-4 h-10">Book Tickets</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Tickets</DialogTitle>

          <div className="flex gap-5 mt-5">
            <img
              src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
              alt=""
              className="w-24 h-24 rounded-2xl object-cover"
            />

            <div>
              <h3 className="font-semibold">{title}</h3>

              <div className="flex gap-2 items-center">
                <Calendar className="w-4" />
                <DialogDescription>{date}</DialogDescription>
              </div>

              <div className="flex gap-2 items-center">
                <LocationEdit className="w-4" />
                <DialogDescription>{location}</DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator className="mt-2" />

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <Label>Number of tickets</Label>

            <Select
              onValueChange={(value) => {
                const num = parseInt(value);
                setTicketCount(num);
                form.setValue("ticketCount", num);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of tickets" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Separator className="mt-2" />
          </div>

          <DialogDescription className="font-medium">Contact Information</DialogDescription>

          <div className="flex gap-3">
            <div>
              <Label>First Name</Label>
              <Input
                placeholder="First Name"
                {...form.register("firstname", { required: true })}
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                placeholder="Last Name"
                { ...form.register("lastname", { required: true })}
              />
            </div>
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              placeholder="Phone Number"
              {...form.register("phonenumber", { required: true })}
            />
          </div>

          <Separator className="mt-2 mb-2" />

          <DialogDescription className="font-medium">Payment Summary</DialogDescription>

          <div className="flex justify-between">
            <Label className="font-normal">Tickets ({ticketCount}x)</Label>
            <Label className="font-normal">₹{totalAmount}/-</Label>
          </div>

          <Separator />

          <div className="flex justify-between">
            <Label className="font-semibold text-lg">Total</Label>
            <Label className="font-semibold text-lg">₹{totalAmount}/-</Label>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">
              <CreditCard className="mr-2" />
              Proceed to Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
