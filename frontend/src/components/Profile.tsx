import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackToHome from "./BackToHome";
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

type ProfileResponse = {
  userName: string;
  profilePic?: string;
  idCard?: string;
  college?: string;
};

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    college: "",
    profilePic: null as File | null,
    idCard: null as File | null,
  });

  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string>("");
  const [idCardPreviewUrl, setIdCardPreviewUrl] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 👈 view vs edit mode

  // const navigate = useNavigate();

  // Fetch existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setInitialLoading(false);
          return;
        }

        const res = await axios.get<ProfileResponse>(
          "https://eventbooker.onrender.com/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        setProfileData((prev) => ({
          ...prev,
          name: data.userName || "",
          college: data.college || "",
        }));

        if (data.profilePic) setProfilePreviewUrl(data.profilePic);
        if (data.idCard) setIdCardPreviewUrl(data.idCard);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, profilePic: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, idCard: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // if backend expects it

      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("college", profileData.college);

      if (userId) {
        formData.append("userId", userId);
      }

      if (profileData.profilePic) {
        formData.append("profilePic", profileData.profilePic);
      }
      if (profileData.idCard) {
        formData.append("idCard", profileData.idCard);
      }

      await axios.post("https://eventbooker.onrender.com/api/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated!");
      setIsEditing(false); // go back to view mode
      // no navigate, staying on profile page feels better
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reload from backend or just exit edit mode (simple way: reload page)
    window.location.reload();
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePreviewUrl} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">Profile</CardTitle>
          <CardDescription>
            {isEditing
              ? "Edit your information and documents"
              : "Your account details and verification"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* VIEW MODE */}
          {!isEditing && (
            <div className="space-y-6">
              <div className="space-y-1 text-left">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-semibold">{profileData.name || "-"}</p>
              </div>

              <div className="space-y-1 text-left">
                <p className="text-sm text-muted-foreground">
                  College / Institution
                </p>
                <p className="text-lg font-semibold">
                  {profileData.college || "-"}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Profile Picture</p>
                {profilePreviewUrl ? (
                  <img
                    src={profilePreviewUrl}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full border"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">No image uploaded</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">ID Card</p>
                {idCardPreviewUrl ? (
                  <img
                    src={idCardPreviewUrl}
                    alt="ID Card"
                    className="w-40 h-28 object-cover rounded-md border"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">No ID card uploaded</p>
                )}
              </div>

              <Button
                className="w-full text-lg py-6 mt-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
                  onChange={handleTextChange}
                  required
                />
              </div>

              {/* College Field */}
              <div className="space-y-2">
                <Label htmlFor="college" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  College / Institution
                </Label>
                <Input
                  id="college"
                  name="college"
                  type="text"
                  placeholder="Enter your college name"
                  value={profileData.college}
                  onChange={handleTextChange}
                  required
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="profilePic"
                  className="flex items-center gap-2 font-medium"
                >
                  <User className="w-4 h-4" />
                  Profile Picture
                </Label>
                <Input
                  id="profilePic"
                  name="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="cursor-pointer"
                />
                {profilePreviewUrl && (
                  <div className="mt-2 flex items-center gap-4">
                    <img
                      src={profilePreviewUrl}
                      alt="Profile Preview"
                      className="w-20 h-20 object-cover rounded-full border"
                    />
                    <p className="text-xs text-muted-foreground">
                      {profileData.profilePic?.name || "Current profile picture"}
                    </p>
                  </div>
                )}
              </div>

              {/* ID Card Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="idCard"
                  className="flex items-center gap-2 font-medium"
                >
                  <IdCard className="w-4 h-4" />
                  Upload ID Card
                </Label>
                <Input
                  id="idCard"
                  name="idCard"
                  type="file"
                  accept="image/*"
                  onChange={handleIdCardChange}
                  className="cursor-pointer"
                />

                {idCardPreviewUrl && (
                  <Card className="p-4 bg-gray-50 dark:bg-gray-800 mt-2">
                    <div className="flex items-center gap-4">
                      <Upload className="w-8 h-8" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">ID Card Preview</p>
                        <p className="text-xs text-muted-foreground">
                          {profileData.idCard?.name || "Current ID card"}
                        </p>
                      </div>
                      <img
                        src={idCardPreviewUrl}
                        alt="ID Card Preview"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    </div>
                  </Card>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="w-full text-lg py-6"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-lg py-6"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <BackToHome/>
      </Card>
    </div>
  );
};

export default Profile;
