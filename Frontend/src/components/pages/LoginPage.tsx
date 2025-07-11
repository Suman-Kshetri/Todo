import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";

type FormProps = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data: ", data);
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

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                value.includes("@") || "Email must include @",
            })}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            showPasswordToggle
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            error={errors.password?.message}
          />
        </div>

        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Signing in..." : "Sign In"}
          type="submit"
          className="w-full cursor-pointer"
        />
      </form>
    </div>
  );
};

export default LoginPage;
