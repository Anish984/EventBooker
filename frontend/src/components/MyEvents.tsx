import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Users, Loader2, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
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

interface Attendee {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  status: "pending" | "approved" | "rejected";
  registeredAt: string;
}

interface HostedEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  address: string;
  organizer: string;
  attendees: Attendee[];
  createdAt: string;
}

const MyEvents = () => {
  const [hostedEvents, setHostedEvents] = useState<HostedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<HostedEvent | null>(null);

  const fetchHostedEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `http://localhost:3000/api/events/my-events/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHostedEvents(res.data.events);
    } catch (error) {
      console.error("Error fetching hosted events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostedEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/events/${eventId}`, {
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

  const handleApprove = async (bookingId: string, eventId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/api/bookings/${bookingId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendee approved successfully!");
      fetchHostedEvents();
      
      // Update selected event
      if (selectedEvent?._id === eventId) {
        const updatedEvent = hostedEvents.find(e => e._id === eventId);
        if (updatedEvent) setSelectedEvent(updatedEvent);
      }
    } catch (error) {
      console.error("Error approving attendee:", error);
      alert("Failed to approve attendee");
    }
  };

  const handleReject = async (bookingId: string, eventId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/api/bookings/${bookingId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendee rejected!");
      fetchHostedEvents();
      
      // Update selected event
      if (selectedEvent?._id === eventId) {
        const updatedEvent = hostedEvents.find(e => e._id === eventId);
        if (updatedEvent) setSelectedEvent(updatedEvent);
      }
    } catch (error) {
      console.error("Error rejecting attendee:", error);
      alert("Failed to reject attendee");
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
                          {new Date(event.date).toLocaleDateString("en-US", {
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

                      <Dialog>
                        <DialogTrigger asChild>
                          <div 
                            className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <Users className="w-4 h-4 text-green-500" />
                            <span className="underline">
                              {event.attendees?.length || 0} Attendees
                            </span>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Manage Attendees - {selectedEvent?.title}</DialogTitle>
                            <DialogDescription>
                              Approve or reject attendee registrations
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 mt-4">
                            {selectedEvent?.attendees && selectedEvent.attendees.length > 0 ? (
                              selectedEvent.attendees.map((attendee) => (
                                <Card key={attendee._id} className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                      <p className="font-semibold">{attendee.user.username}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {attendee.user.email}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Registered: {new Date(attendee.registeredAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {getStatusBadge(attendee.status)}
                                      {attendee.status === "pending" && (
                                        <>
                                          <Button
                                            size="sm"
                                            variant="default"
                                            className="bg-green-500 hover:bg-green-600"
                                            onClick={() => handleApprove(attendee._id, event._id)}
                                          >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Approve
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleReject(attendee._id, event._id)}
                                          >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Reject
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </Card>
                              ))
                            ) : (
                              <p className="text-center text-muted-foreground py-8">
                                No attendees yet
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          (window.location.href = `/event/${event._id}`)
                        }
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
                        {new Date(event.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;