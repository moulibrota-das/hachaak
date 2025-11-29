import LoginForm from "./components/LoginForm";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  );
}
