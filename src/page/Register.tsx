import AuthLayout from "../components/Auth/AuthLayout";
import RegisterForm from "../components/Auth/Register";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
