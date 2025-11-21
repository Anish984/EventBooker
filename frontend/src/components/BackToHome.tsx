// src/components/BackToHome.tsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex justify-center">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => navigate("/home")}   // change to "/" if needed
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
    </div>
  );
};

export default BackToHome;
