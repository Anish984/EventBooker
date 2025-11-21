import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // 👈 add this
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Loader2,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  IdCardIcon,
} from "lucide-react";
import axios from "axios";
import Header from "./Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import BackToHome from "./BackToHome";

interface Attendee {
  _id: string; // booking _id
  user: {
    username: string;
    email: string;
    idCard?: string;
  };
  status: "pending" | "approved" | "rejected";
  bookingDate?: string;
}

interface HostedEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  address: string;
  organizer: string;
  createdAt: string;
  eventPic?: string;           // 👈 make sure backend sends this or rename to imageUrl if needed
}

const MyEvents = () => {
  const [hostedEvents, setHostedEvents] = useState<HostedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState<HostedEvent | null>(null);
  const [pendingRequests, setPendingRequests] = useState<Attendee[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  const navigate = useNavigate();    // 👈 hook

  const fetchHostedEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://eventbooker.onrender.com/api/createdEvents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHostedEvents(res.data.events);
    } catch (error) {
      console.error("Error fetching hosted events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async (eventId: string) => {
    try {
      setRequestsLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://eventbooker.onrender.com/api/pendingRequests?eventId=${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPendingRequests(res.data.requests || []);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setPendingRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    fetchHostedEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://eventbooker.onrender.com/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event deleted successfully!");
      fetchHostedEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  // 🔴 your requested function: navigate to EventDetail with props
  const handleViewEvent = (event: HostedEvent) => {
    navigate(`/event/${event._id}`, {
      state: {
        id: event._id,
        title: event.title,
        location: event.address,
        date: event.date,
        description: event.description,
        eventPic: event.eventPic,     // or imageUrl if that’s your field
      },
    });
  };

  const handleRequestAction = async (
    bookingId: string,
    action: "approve" | "reject",
    eventId: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://eventbooker.onrender.com/api/handleRequest",
        { bookingId, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Attendee ${action}d successfully!`);
      fetchPendingRequests(eventId);
    } catch (error) {
      console.error(`Error trying to ${action} attendee:`, error);
      alert(`Failed to ${action} attendee`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Hosted Events</h1>
            <p className="text-muted-foreground">
              Manage and view all the events you've created
            </p>
          </div>

          {hostedEvents.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-xl text-muted-foreground mb-4">
                  You haven't created any events yet
                </p>
                <Button onClick={() => (window.location.href = "/host-event")}>
                  Create Your First Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostedEvents.map((event) => (
                <Card
                  key={event._id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="line-clamp-1">{event.address}</span>
                      </div>

                      {/* Dialog for managing requests */}
                      <Dialog
                        onOpenChange={(open) => {
                          if (open) {
                            setSelectedEvent(event);
                            fetchPendingRequests(event._id);
                          } else {
                            setSelectedEvent(null);
                            setPendingRequests([]);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600 transition-colors">
                            <Users className="w-4 h-4 text-green-500" />
                            <span className="underline">Manage Requests</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Pending Requests – {selectedEvent?.title}
                            </DialogTitle>
                            <DialogDescription>
                              Approve or reject attendee registrations for this
                              event.
                            </DialogDescription>
                          </DialogHeader>

                          {requestsLoading ? (
                            <div className="flex justify-center items-center py-6">
                              <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                          ) : pendingRequests.length > 0 ? (
                            <div className="space-y-4 mt-4">
                              {pendingRequests.map((req) => (
                                <Card key={req._id} className="p-4">
                                  <div className="flex justify-between items-center gap-4">
                                    <div className="flex-1">
                                      <p className="font-semibold">
                                        {req.user.username}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {req.user.email}
                                      </p>
                                      {req.user.idCard && (
                                        <div className="mt-2 flex items-center gap-2">
                                          <IdCardIcon className="w-4 h-4 text-blue-500" />
                                          <a
                                            href={req.user.idCard}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-blue-600 underline"
                                          >
                                            View ID Card
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                      {getStatusBadge(req.status)}
                                      {req.status === "pending" && (
                                        <div className="flex gap-2">
                                          <Button
                                            size="sm"
                                            variant="default"
                                            className="bg-green-500 hover:bg-green-600"
                                            onClick={() =>
                                              handleRequestAction(
                                                req._id,
                                                "approve",
                                                event._id
                                              )
                                            }
                                          >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Approve
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                              handleRequestAction(
                                                req._id,
                                                "reject",
                                                event._id
                                              )
                                            }
                                          >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Reject
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-8">
                              No pending requests for this event.
                            </p>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewEvent(event)}  // 👈 use the function
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(event._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        📅 Created on{" "}
                        {new Date(event.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
          <BackToHome/>
      </div>
    </div>
  );
};

export default MyEvents;
