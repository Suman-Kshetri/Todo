import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../utils/axios";
import { handleError, handleSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { setUser } from "../../features/auth/authSlice";
import Navbar from "../Navbar";
import GoogleLogin from "./GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const userData = response.data.data?.user || response.data.user;
        console.log("Login response:", response.data);

        if (userData) {
          dispatch(setUser(userData));
          handleSuccess(response.data.message);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          handleError("User data not received");
        }
      } else {
        handleError(response?.data?.message);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Login Failed. Try Again";
      handleError(errorMessage);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--bg-color)] transition-colors duration-300 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Heading above card */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color)]">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--muted-text-color)] mt-1">
              Sign in to continue to your workspace
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

            {/* Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
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

              <div className="pt-2">
                <Button
                  disabled={isSubmitting}
                  label={isSubmitting ? "Signing in…" : "Sign In"}
                  type="submit"
                  className="w-full cursor-pointer"
                />
              </div>
            </form>
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-[var(--muted-text-color)] mt-6">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-[var(--accent-color)] hover:underline transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
