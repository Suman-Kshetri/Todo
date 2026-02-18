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
import Navbar from "../Navbar";
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
      .refine(
        (file) => file?.size <= 5 * 1024 * 1024,
        "File size must be under 5MB",
      )
      .refine(
        (file) => ["image/jpeg", "image/png"].includes(file?.type),
        "Only JPEG or PNG allowed",
      ),
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        handleSuccess(response.data.message || "Signup successful!");
        navigate("/login");
      } else {
        handleError(response?.data?.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
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

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--bg-color)] transition-colors duration-300 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12 mt-8">
        <div className="w-full max-w-md">
          {/* Heading above card */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color)]">
              Create your account
            </h1>
            <p className="text-sm text-[var(--muted-text-color)] mt-1">
              Join Netly and start managing your tasks
            </p>
          </div>

          <div
            className="rounded-2xl border p-8 shadow-xl space-y-5 transition-colors duration-300"
            style={{
              backgroundColor: "var(--form-bg)",
              borderColor: "var(--border-color)",
              boxShadow: "0 8px 40px var(--shadow-color)",
            }}
          >
            {/* Google */}
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GoogleLogin />
            </GoogleOAuthProvider>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--border-color)" }}
              />
              <span className="text-xs text-[var(--muted-text-color)] font-medium uppercase tracking-widest">
                or
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--border-color)" }}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
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

              {/* File upload */}
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-text-color)] mb-1.5">
                  Profile Picture
                </label>
                <div
                  className="relative flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 cursor-pointer transition-all duration-150 hover:border-[var(--accent-color)]"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/jpeg,image/png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-lg"
                    onChange={handleFileChange}
                  />
                  <span
                    className="text-sm truncate flex-1"
                    style={{
                      color:
                        fileName === "No file chosen"
                          ? "var(--muted-text-color)"
                          : "var(--text-color)",
                    }}
                  >
                    {fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("avatar-upload")?.click()
                    }
                    className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-md text-white transition-all active:scale-95"
                    style={{ backgroundColor: "var(--button-bg)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--button-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--button-bg)")
                    }
                  >
                    Browse
                  </button>
                </div>
                {errors.avatar && (
                  <p className="text-xs text-[var(--error-color)] mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {getErrorMessage(errors.avatar)}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  disabled={isSubmitting}
                  label={isSubmitting ? "Creating account…" : "Create Account"}
                  type="submit"
                  className="w-full cursor-pointer"
                />
              </div>
            </form>
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-[var(--muted-text-color)] mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[var(--accent-color)] hover:underline transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
};

export default SignupPage;
