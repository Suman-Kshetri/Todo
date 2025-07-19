import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
        dispatch(setUser(response.data.user));
        handleSuccess(response.data.message);
        
        setTimeout(() => {
          navigate("/home");
          window.location.reload(); // <-- forces full page reload
        }, 1500);
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
      className={`min-h-screen flex flex-col bg-[var(--bg-color)] px-4 transition-colors duration-300 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center space-y-6 max-w-md mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--form-bg)] shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 border border-[var(--border-color)] transition-colors duration-300"
        >
        <h2 className="text-2xl font-bold text-center text-[var(--text-color)]">
          Sign In to Your Account
        </h2>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin />
          </GoogleOAuthProvider>

          <div className="flex items-center justify-center w-full">
            <span className="text-sm text-[var(--muted-text-color)]">or</span>
          </div>

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
            className="w-full bg-[var(--button-bg)] hover:bg-[var(--button-hover)] transition cursor-pointer"
          />
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
