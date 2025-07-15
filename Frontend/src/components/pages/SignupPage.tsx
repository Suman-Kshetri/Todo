import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

// Zod validation schema
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include one uppercase letter")
    .regex(/[0-9]/, "Must include one number")
    .regex(/[^A-Za-z0-9]/, "Must include one special character"),
  avatar: z
    .any()
    .refine((file) => file instanceof File, "Profile image is required")
    .refine((file) => file?.size <= 5 * 1024 * 1024, "File size must be under 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file?.type),
      "Only JPEG or PNG allowed"
    ),
});

type FormProps = z.infer<typeof schema>;

const getErrorMessage = (error: unknown): string | undefined => {
  if (typeof error === "object" && error && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    return typeof msg === "string" ? msg : undefined;
  }
  return undefined;
};

const SignupPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");

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
      setError(null);
      console.log("Submitted:", data);
      // TODO: call backend API here
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--form-bg)] shadow-xl rounded-2xl mt-20 p-8 max-w-md w-full space-y-6 border border-[var(--border-color)] transition-colors duration-300"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-[var(--text-color)]">
          Create Your Account
        </h2>

        {error && (
          <div className="text-[var(--error-color)] text-sm text-center">{error}</div>
        )}

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-[var(--border-color)] rounded py-2 hover:bg-[var(--secondary-color)] transition text-sm font-medium text-[var(--text-color)]"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <span className="text-sm text-[var(--muted-text-color)]">or</span>
        </div>

        {/* Form fields */}
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

        {/* Custom File Upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Profile Picture
          </label>
          <div className="relative w-full flex items-center gap-4 border border-[var(--border-color)] rounded-lg bg-[var(--input-bg)] px-4 py-2 cursor-pointer select-none">
            {/* Hidden native input */}
            <input
              type="file"
              id="avatar-upload"
              accept="image/jpeg,image/png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-lg"
              onChange={handleFileChange}
            />
            {/* Display chosen file name */}
            <span className="text-[var(--text-color)] truncate">{fileName}</span>
            {/* Browse button */}
            <button
              type="button"
              className="bg-[var(--button-bg)] hover:bg-[var(--button-hover)] text-white px-3 py-1 rounded transition"
              onClick={() => {
                const fileInput = document.getElementById("avatar-upload");
                fileInput?.click();
              }}
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
          className="w-full cursor-pointer"
        />
      </form>
    </div>
  );
};

export default SignupPage;
