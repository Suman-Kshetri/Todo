import {SubmitHandler, useForm} from "react-hook-form" 
import Input from "../ui/Input";
import Button from "../ui/Button";

type FormProps = {
    email:string,
    password: string,
};

const Login = () => {
  const {register, handleSubmit} = useForm<FormProps>();

  const onSubmit : SubmitHandler<FormProps> = (data) => {
    console.log("Data: ", data);
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" type="email" {...register("email")} />
      <Input label="Password" type="password" {...register("password")} />
      <Button label="Submit"/>
    </form>
  )
}

export default Login
