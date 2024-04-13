import LoginHeader from "@/modules/Login/ui/LoginHeader.tsx";
import LoginForm from "@/modules/Login/ui/LoginForm.tsx";

const Login = () => {
  return (
    <div className="flex gap-4 flex-col mt-10 w-4/12 mx-auto">
      <LoginHeader />
      <LoginForm />
    </div>
  );
};

export default Login;
