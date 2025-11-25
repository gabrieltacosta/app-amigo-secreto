"use client";

import { Gift, UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { logout } from "@/app/logout/actions";

export default function Header() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link
            href={"/"}
            className="text-2xl font-bold flex items-center gap-2"
          >
            <Gift className="h-6 w-6 text-red-400" />
            <span>
              Amigo <span className="font-thin">Secreto</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href={"/app/grupos"}
              className="text-foreground text-sm flex gap-2 items-center"
            >
              <UserRound className="w-4 h-4" />
              Meus Grupos
            </Link>
            <Button asChild variant="outline">
              <Link href={"/app/grupos/novo"}>Novo Grupo</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex gap-2 items-center"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
