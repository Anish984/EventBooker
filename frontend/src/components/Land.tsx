import { Card, CardContent } from "./ui/card";
import {
  BanknoteArrowDown,
  BookmarkIcon,
  CirclePercent,
  ClockCheck,
  FileBadge,
  Medal,
  Music,
  Tags,
  Ticket,
  Trophy,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Land = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div>
      <div className="text-center mt-16 mb-10">
        <h1 className="text-7xl font-bold">What Event would</h1>
        <h1 className="text-7xl font-bold">you like to go to?</h1>
        <p className="my-10 text-2xl font-medium ">
          More than 100 events are now available to you.
        </p>
      </div>
      <Card className="w-3/4 m-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl border-thickness-4">
        <div className="my-7 flex gap-4 justify-center ">
          <div className="flex items-center mx-20 gap-2">
            <Music className="w-5 h-5" />
            <h1 className="font-bold text-1xl">Shows</h1>
          </div>
          <div className="flex items-center mx-20 gap-2 ">
            <Trophy className="w-5 h-5" />
            <h1 className="font-bold text-1xl">Expos</h1>
          </div>
          <div className="flex items-center mx-20 gap-2">
            <FileBadge className="w-5 h-5" />
            <h1 className="font-bold text-1xl">Symposiums</h1>
          </div>
          <div className="flex items-center mx-20 gap-2">
            <Medal className="w-5 h-5" />
            <h1 className="font-bold text-1xl">Hackathons</h1>
          </div>
        </div>
      </Card>
      <div className="flex justify-center gap-16 my-3">
        <div className="flex items-center gap-2">
          <BookmarkIcon />
          <h1 className="font-bold text-1xl">Book anytime</h1>
        </div>
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5" />
          <h1 className="font-bold text-1xl">Refundable tickets</h1>
        </div>
        <div className="flex items-center gap-2">
          <Tags className="w-5 h-5" />
          <h1 className="font-bold text-1xl">Smart deals</h1>
        </div>
      </div>

      <div className="flex justify-center my-10 py-9">
        <Button
          className="text-xl px-14 py-7 text-white font-semibold shadow-lg hover:scale-105 transition-transform bg-black dark:bg-blue-800"
          onClick={handleClick}
        >
          Explore Events
        </Button>
      </div>

      <section className="py-4"></section>
      <div className="grid grid-cols-2 gap-6 mx-16">
        {/* Left side - Stacked Cards */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1">
            <div className="flex items-center gap-4 p-6">
              <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                <BanknoteArrowDown className="h-20 w-20" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-current">
                  Refundable Tickets
                </h3>
                <p className="text-sm text-current/70 mt-1">
                  You can pay a ticket in 2 portions throughout a fixed period
                  of time.
                </p>
              </div>
            </div>
          </Card>

          <Card className="flex-1">
            <div className="flex items-center gap-4 p-6">
              <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                <CirclePercent className="h-20 w-20" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-current">
                  Smart Deals
                </h3>
                <p className="text-sm text-current/70 mt-1">
                  You can pay a ticket in 2 portions throughout a fixed period
                  of time.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side - Book Anytime Card (spans full height) */}
        <Card className="flex items-center">
          <div className="flex items-center gap-6 p-8">
            <div className="w-40 h-40 rounded-md overflow-hidden shrink-0">
              <ClockCheck className="w-40 h-40" />
            </div>

            <div className="flex-1">
              <h3 className="text-4xl font-semibold text-current">
                Book Anytime!
              </h3>
              <p className="text-base text-current/70 mt-3">
                You can pay a ticket in 2 portions throughout a fixed period of
                time. Start invoicing for free.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-20">
        <h1 className="font-bold text-3xl text-center">Loved By Thousands</h1>
        <p className="font-base text-md text-center">
          Smooth, easy ticket buying — hear it from our happy users.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6 mx-16 mt-10 mb-20">
        {/* Review Card 1 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-muted-foreground">Concert Lover</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              "Amazing platform! Bought tickets for 3 concerts this month. Super
              smooth experience and great deals."
            </p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Card 2 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Sarah Miller</h4>
                <p className="text-sm text-muted-foreground">
                  2x National Level Hackathon Winner
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              "The refundable tickets feature saved me when my plans changed.
              Highly recommend this service!"
            </p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Card 3 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Mike Chen</h4>
                <p className="text-sm text-muted-foreground">Sports Fan</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              "Best ticket booking platform I've used. Clean interface and
              instant confirmations every time."
            </p>
            <div className="flex mt-3">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
              <span className="text-gray-300">★</span>
            </div>
          </CardContent>
        </Card>

        {/* Review Card 4 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Emma Wilson</h4>
                <p className="text-sm text-muted-foreground">Festival Lover</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              "Got amazing deals on festival tickets. The booking process is
              incredibly easy and secure!"
            </p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-20">
        <h1 className="font-bold text-3xl text-center">
          Frequently Asked Questions
        </h1>
        <p className="font-base text-md text-center">
          Explore the most common questions and detailed answers about our
          events
        </p>
        <p className="font-base text-md text-center -mt-1">
          or concerts, and security to help guide your journey.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-10 mb-20 px-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              How do I purchase tickets?
            </AccordionTrigger>
            <AccordionContent>
              Simply browse our events, select the one you want to attend,
              choose your preferred seats or ticket type, and proceed to
              checkout. You'll receive your tickets via email immediately after
              payment confirmation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards (Visa, MasterCard, American
              Express), debit cards, UPI, net banking, and popular digital
              wallets. All transactions are secured with industry-standard
              encryption.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Can I get a refund if I can't attend?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We offer refundable tickets on most events. Refund
              eligibility depends on the event's refund policy and the time of
              cancellation. Check the specific event details for refund terms
              before purchasing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              How will I receive my tickets?
            </AccordionTrigger>
            <AccordionContent>
              Tickets are delivered digitally via email and are also available
              in your account dashboard. You can download them as PDF or display
              the QR code on your mobile device for entry. E-tickets are sent
              within minutes of purchase confirmation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              Is it safe to buy tickets from your platform?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely! We use bank-level SSL encryption to protect your
              personal and payment information. We're PCI DSS compliant and all
              transactions are processed through secure payment gateways. Your
              security is our top priority.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              Can I transfer my ticket to someone else?
            </AccordionTrigger>
            <AccordionContent>
              Yes, most tickets can be transferred to another person through
              your account dashboard. Simply select the ticket and choose the
              transfer option. The new recipient will receive the ticket via
              email. Note that some events may have restrictions on ticket
              transfers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Land;
