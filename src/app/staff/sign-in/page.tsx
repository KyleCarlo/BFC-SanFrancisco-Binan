import SignInForm from "@components/signInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[100dvh]">
      <h1 className="text-bold text-italic text-xl mb-5 text-gold">
        BFC Staff Login
      </h1>
      <SignInForm role="staff" />
    </div>
  );
}
