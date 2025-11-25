import LoginForm from "@/components/login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/app");
  }

  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center">
      <LoginForm />
    </div>
  );
}
