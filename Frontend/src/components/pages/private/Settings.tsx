import React, { useState } from "react";
import axios from "axios";
import Input from "../../ui/Input"; // your input component path
import Button from "../../ui/Button"; // your button component path

const Settings: React.FC = () => {
  // Form state for account update
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Password change state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Avatar upload state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Feedback messages
  const [accountMsg, setAccountMsg] = useState<string | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [avatarMsg, setAvatarMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update Account Details handler
  const handleAccountUpdate = async () => {
    setAccountMsg(null);
    setErrorMsg(null);
    try {
      const res = await axios.patch("/api/v1/user/account", { fullName, email });
      setAccountMsg(res.data.message || "Account updated successfully.");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to update account.");
    }
  };

  // Change Password handler
  const handleChangePassword = async () => {
    setPasswordMsg(null);
    setErrorMsg(null);
    try {
      const res = await axios.patch("/api/v1/user/password", {
        oldPassword,
        newPassword,
      });
      setPasswordMsg(res.data.message || "Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to change password.");
    }
  };

  // Update Avatar handler
  const handleAvatarUpdate = async () => {
    setAvatarMsg(null);
    setErrorMsg(null);
    if (!avatarFile) {
      setErrorMsg("Please select an avatar file.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const res = await axios.patch("/api/v1/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatarMsg(res.data.message || "Avatar updated successfully.");
      setAvatarFile(null);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to update avatar.");
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
        <Button label="Update Account" onClick={handleAccountUpdate} />
        {accountMsg && <p className="text-green-600">{accountMsg}</p>}
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
        <Button label="Change Password" onClick={handleChangePassword} />
        {passwordMsg && <p className="text-green-600">{passwordMsg}</p>}
      </section>

      {/* Avatar Update */}
      <section className="border p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Update Profile Photo</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
        />
        <Button label="Update Avatar" onClick={handleAvatarUpdate} />
        {avatarMsg && <p className="text-green-600">{avatarMsg}</p>}
      </section>

      {/* Display Error Message */}
      {errorMsg && <p className="text-red-600 font-semibold">{errorMsg}</p>}
    </div>
  );
};

export default Settings;
