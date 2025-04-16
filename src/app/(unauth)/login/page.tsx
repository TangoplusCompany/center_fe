import AuthStoreProvider from "@/providers/AuthProvider";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <AuthStoreProvider>
          <LoginForm />
        </AuthStoreProvider>
      </div>
    </div>
  );
}
