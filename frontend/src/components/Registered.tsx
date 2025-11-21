import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";
import BackToHome from "./BackToHome";

interface RegisteredEvent {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    address: string;
    eventPic?: string; // add if you have image
  } | null;
  status: "pending" | "approved" | "rejected";
  registeredAt?: string;
}

const Registered = () => {
  const navigate = useNavigate();

  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const handleViewEvent = (ev: NonNullable<RegisteredEvent["event"]>) => {
    navigate(`/event/${ev._id}`, {
      state: {
        id: ev._id,
        title: ev.title,
        location: ev.address,
        date: ev.date,
        description: ev.description,
        eventPic: ev.eventPic, // or imageUrl if that’s your field
      },
    });
  };

  const fetchRegisteredEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found");
        setRegisteredEvents([]);
        setLoading(false);
        return;
      }

      const res = await axios.get<RegisteredEvent[]>(
        "https://eventbooker.onrender.com/api/getRegisteredEvents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegisteredEvents(res.data);
    } catch (error) {
      console.error("Error fetching registered events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending Approval
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Registered Events</h1>
          <p className="text-muted-foreground">
            Track your event registrations and their approval status
          </p>
        </div>

        {registeredEvents.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-xl text-muted-foreground mb-4">
                You haven't registered for any events yet
              </p>
              <Button onClick={() => (window.location.href = "/home")}>
                Browse Events
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((registration, index) => {
              const ev = registration.event;

              if (!ev) {
                return (
                  <Card key={index} className="border-red-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600">
                        Event no longer available
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getStatusBadge(registration.status)}
                      <p className="mt-2 text-sm text-muted-foreground">
                        This event may have been deleted by the organizer.
                      </p>
                    </CardContent>
                  </Card>
                );
              }

              return (
                <Card
                  key={ev._id ?? index}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl line-clamp-2">
                        {ev.title}
                      </CardTitle>
                      {getStatusBadge(registration.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {ev.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {ev.date
                            ? new Date(ev.date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Date not available"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">
                          {ev.address || "Address not available"}
                        </span>
                      </div>

                      {registration.registeredAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            Registered on{" "}
                            {new Date(
                              registration.registeredAt
                            ).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>

                    {registration.status === "pending" && (
                      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                          ⏳ Your registration is pending approval from the event
                          organizer. You'll be notified once it's reviewed.
                        </p>
                      </div>
                    )}

                    {registration.status === "approved" && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                        <p className="text-xs text-green-800 dark:text-green-200">
                          ✅ Congratulations! Your registration has been
                          approved. See you at the event!
                        </p>
                      </div>
                    )}

                    {registration.status === "rejected" && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <p className="text-xs text-red-800 dark:text-red-200">
                          ❌ Unfortunately, your registration was not approved.
                        </p>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => handleViewEvent(ev)}
                    >
                      View Event Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        <BackToHome/>
      </div>
    </div>
  );
};

export default Registered;
