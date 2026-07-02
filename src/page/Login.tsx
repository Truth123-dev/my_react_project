import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      footerText="New to the app?"
      footerLinkText="Create an account"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
