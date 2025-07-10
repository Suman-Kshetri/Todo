import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";

type FormProps = {
  email: string;
  password: string;
};

const Login = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
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
            showPasswordToggle // 👈 only this field gets the toggle
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
