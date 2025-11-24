"use server";

import { createClient } from "@/utils/supabase/server";

export async function requestMagicLink(email: string) {
  const supabase = await createClient();

  const redirectBase =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${redirectBase}/auth/confirm`,
    },
  });

  if (error) {
    return { error: error.message ?? "Não foi possível enviar o link." };
  }

  return { success: true };
}
