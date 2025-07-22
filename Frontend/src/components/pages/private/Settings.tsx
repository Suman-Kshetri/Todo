import { useState } from "react";
import axios from "axios";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { handleSuccess, handleError } from "../../../utils/toast";



const Settings = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAccountUpdate = async () => {

    try {
      const res = await axios.patch("/api/v1/auth/user/update-account", {
        fullName,
        email,
      });
      handleSuccess(res.data.message || "Account updated successfully.");
    } catch (err: any) {
      handleError(err.response?.data?.message || "Failed to update account.");
    }
  };

  // Change Password handler
  const handleChangePassword = async () => {

    try {
      const res = await axios.patch("/api/v1/auth/user/change-password", {
        oldPassword,
        newPassword,
      });
      handleSuccess(res.data.message || "Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      handleError(err.response?.data?.message || "Failed to change password.");
    }
  };

  // Update Avatar handler
  const handleAvatarUpdate = async () => {
    
    if (!avatarFile) {
      handleError("Please select an avatar file.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const res = await axios.patch(
        "/api/v1/auth/user/update-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSuccess(res.data.message || "Avatar updated successfully.");
      setAvatarFile(null);
    } catch (err: any) {
      handleError(err.response?.data?.message || "Failed to update avatar.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-[var(--text-color)] space-y-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Account Details Update */}
      <section className="border p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Update Account Details</h2>
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Button label="Update Account" onClick={handleAccountUpdate} className="cursor-pointer" />
      </section>

      {/* Password Change */}
      <section className="border p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <Input
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          showPasswordToggle
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          showPasswordToggle
        />
        <Button label="Change Password" onClick={handleChangePassword} className="cursor-pointer"/>
      </section>

      {/* Avatar Update */}
      <section className="border p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Update Profile Photo</h2>
        <Input
          label="Image Upload"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2 text-[var(--text-color)] placeholder:text-[var(--muted-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
        />
        <Button label="Update Avatar" onClick={handleAvatarUpdate}  className="cursor-pointer"/>
      </section>
    </div>
  );
};

export default Settings;
