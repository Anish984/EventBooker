import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Upload, User, Building2, IdCard } from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    institution: "",
    idCard: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData({ ...profileData, idCard: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Your API call here
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("institution", profileData.institution);
      if (profileData.idCard) {
        formData.append("idCard", profileData.idCard);
      }

      // Example: await axios.post("/api/profile", formData);

      navigate("/home");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={previewUrl} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information and ID verification
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={profileData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Institution Field */}
            <div className="space-y-2">
              <Label htmlFor="institution" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Institution Name
              </Label>
              <Input
                id="institution"
                name="institution"
                type="text"
                placeholder="Enter your institution name"
                value={profileData.institution}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* ID Card Upload */}
            <div className="space-y-2">
              <Label htmlFor="idCard" className="flex items-center gap-2">
                <IdCard className="w-4 h-4" />
                Upload ID Card
              </Label>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Input
                    id="idCard"
                    name="idCard"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>

                {/* Preview */}
                {previewUrl && (
                  <Card className="p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-4">
                      <Upload className="w-8 h-8 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">ID Card Preview</p>
                        <p className="text-xs text-muted-foreground">
                          {profileData.idCard?.name}
                        </p>
                      </div>
                      <img
                        src={previewUrl}
                        alt="ID Card Preview"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-lg py-6"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
