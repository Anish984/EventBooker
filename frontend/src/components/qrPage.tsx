import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "./Header";

export default function QRPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">No ticket data found</h1>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    );
  }

  const qrValue = JSON.stringify(state);

  return (
    <div>
        <Header />
      <div className="min-h-screen flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6">Your Ticket QR Code</h1>

        <Card className="shadow-lg">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <QRCode value={qrValue} size={200} />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold">{state.eventTitle}</h2>
              <p className="text-gray-600">{state.eventDate}</p>
              <p className="text-gray-600">{state.eventLocation}</p>
            </div>

            <div className="w-full border-t pt-4 mt-2 text-sm">
              <p>
                <strong>Name:</strong> {state.firstname} {state.lastname}
              </p>
              <p>
                <strong>Phone:</strong> {state.phonenumber}
              </p>
              <p>
                <strong>Tickets:</strong> {state.ticketCount}
              </p>
            </div>

            <Button className="mt-4 w-full" onClick={() => navigate("/home")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
