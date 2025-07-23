import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { handleError, handleSuccess } from "../../utils/toast";
import axios from "../../utils/axios";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Navbar from "../Navbar"; // import Navbar here
import GoogleLogin from "./GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    fullname: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include one uppercase letter")
      .regex(/[0-9]/, "Must include one number")
      .regex(/[^A-Za-z0-9]/, "Must include one special character"),
    confirmPassword: z.string(),
    avatar: z
      .any()
      .refine((file) => file instanceof File, "Profile image is required")
      .refine((file) => file?.size <= 5 * 1024 * 1024, "File size must be under 5MB")
      .refine((file) => ["image/jpeg", "image/png"].includes(file?.type), "Only JPEG or PNG allowed"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormProps = z.infer<typeof schema>;

const getErrorMessage = (error: any): string | undefined =>
  typeof error?.message === "string" ? error.message : undefined;

const SignupPage = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar);

      const response = await axios.post("/api/v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        handleSuccess(response.data.message || "Signup successful!");
        navigate("/login");
      } else {
        handleError(response?.data?.message);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      handleError(errorMessage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file, { shouldValidate: true });
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  // Remove handleToggle and ToggleButton from here because Navbar controls theme

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--bg-color)] px-4 transition-colors duration-300 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--form-bg)] shadow-xl rounded-2xl mt-20 mb-40 p-8 max-w-md w-full space-y-6 border border-[var(--border-color)] transition-colors duration-300"
        >
          <h2 className="text-2xl font-bold text-center text-[var(--text-color)]">
            Create Your Account
          </h2>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin />
          </GoogleOAuthProvider>
          <div className="flex items-center justify-center">
            <span className="text-sm text-[var(--muted-text-color)]">or</span>
          </div>

          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            {...register("username")}
            error={getErrorMessage(errors.username)}
          />

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register("fullname")}
            error={getErrorMessage(errors.fullname)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={getErrorMessage(errors.email)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            showPasswordToggle
            {...register("password")}
            error={getErrorMessage(errors.password)}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            showPasswordToggle
            {...register("confirmPassword")}
            error={getErrorMessage(errors.confirmPassword)}
          />

          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
              Profile Picture
            </label>
            <div className="relative w-full flex items-center gap-4 border border-[var(--border-color)] rounded-lg bg-[var(--input-bg)] px-4 py-2 cursor-pointer select-none">
              <input
                type="file"
                id="avatar-upload"
                accept="image/jpeg,image/png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-lg"
                onChange={handleFileChange}
              />
              <span className="text-[var(--text-color)] truncate">{fileName}</span>
              <button
                type="button"
                className="bg-[var(--button-bg)] hover:bg-[var(--button-hover)] text-white px-3 py-1 rounded transition"
                onClick={() => document.getElementById("avatar-upload")?.click()}
              >
                Browse
              </button>
            </div>
            {errors.avatar && (
              <p className="text-sm text-[var(--error-color)] mt-1">
                {getErrorMessage(errors.avatar)}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            label={isSubmitting ? "Signing up..." : "Sign Up"}
            type="submit"
            className="w-full bg-[var(--button-bg)] hover:bg-[var(--button-hover)] transition cursor-pointer"
          />
        </form>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
};

export default SignupPage;
