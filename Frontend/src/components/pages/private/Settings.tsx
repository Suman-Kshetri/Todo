import { useState } from "react";
import axios from "../../../utils/axios";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { handleSuccess, handleError } from "../../../utils/toast";

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className="rounded-2xl border overflow-hidden"
    style={{
      backgroundColor: "var(--form-bg)",
      borderColor: "var(--border-color)",
    }}
  >
    <div
      className="flex items-center gap-3 px-6 py-4 border-b"
      style={{ borderColor: "var(--border-color)" }}
    >
      <span className="text-[var(--accent-color)]">{icon}</span>
      <h2 className="text-sm font-semibold text-[var(--text-color)]">
        {title}
      </h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      handleSuccess(res.data.message || "Avatar updated successfully.");
      setAvatarFile(null);
    } catch (err: any) {
      handleError(err.response?.data?.message || "Failed to update avatar.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-[var(--text-color)] space-y-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color)]">
          Settings
        </h1>
        <p className="text-sm text-[var(--muted-text-color)] mt-1">
          Manage your account preferences.
        </p>
      </div>

      {/* Account Details */}
      <SectionCard
        title="Account Details"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        }
      >
        <div className="space-y-1">
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
        </div>
        <Button
          label="Update Account"
          onClick={handleAccountUpdate}
          className="cursor-pointer mt-2"
        />
      </SectionCard>

      {/* Password */}
      <SectionCard
        title="Change Password"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        }
      >
        <div className="space-y-1">
          <Input
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Current password"
            showPasswordToggle
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            showPasswordToggle
          />
        </div>
        <Button
          label="Change Password"
          onClick={handleChangePassword}
          className="cursor-pointer mt-2"
        />
      </SectionCard>

      {/* Avatar */}
      <SectionCard
        title="Profile Photo"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        }
      >
        <div className="space-y-1 mb-4">
          <Input
            label="Image Upload"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            className="cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[var(--button-bg)] file:text-white file:cursor-pointer"
          />
          {avatarFile && (
            <p className="text-xs text-[var(--muted-text-color)]">
              Selected:{" "}
              <span className="text-[var(--text-color)] font-medium">
                {avatarFile.name}
              </span>
            </p>
          )}
        </div>
        <Button
          label="Update Avatar"
          onClick={handleAvatarUpdate}
          className="cursor-pointer"
        />
      </SectionCard>
    </div>
  );
};

export default Settings;
