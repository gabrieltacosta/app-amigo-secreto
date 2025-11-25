"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const supabase = await createClient();
  const cookieStore = await cookies();

  // Fazer logout no Supabase
  await supabase.auth.signOut();

  // Limpar o cookie do magic link
  cookieStore.delete("sb-auth-token");
  cookieStore.delete("sb-refresh-token");

  redirect("/login");
}
