import { LoginForm, MainTitle } from "@/components";

const LoginPage = ({}) => {
  return (
    <main className="h-screen grid place-items-center">
      <div className="bg-primary/5 p-4 w-96 rounded-lg">
        <MainTitle title={"Login"} />
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
