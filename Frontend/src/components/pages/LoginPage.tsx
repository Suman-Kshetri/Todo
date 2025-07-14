import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include one uppercase")
    .regex(/[0-9]/, "Must include one number")
    .regex(/[^A-Za-z0-9]/, "Must include one special character"),
});

type FormProps = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data: ", data);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--form-bg)] shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 border border-[var(--border-color)] transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--text-color)]">
          Sign In to Your Account
        </h2>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          showPasswordToggle
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Signing in..." : "Sign In"}
          type="submit"
          className="w-full cursor-pointer"
        />

        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500">or</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border cursor-pointer border-gray-300 rounded py-2 hover:bg-gray-100 transition text-sm font-medium"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
