"use client";

import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useSaved } from "@/hooks/useSaved";

interface SaveCollegeButtonProps {
  collegeId: string;
}

export function SaveCollegeButton({ collegeId }: SaveCollegeButtonProps) {
  const { status } = useSession();
  const { isSaved, toggleSave } = useSaved();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const saved = isSaved(collegeId);
  const isLoggedIn = status === "authenticated";

  const handleClick = () => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }
    void toggleSave(collegeId);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 ${
          saved
            ? "bg-brand-600 text-white hover:bg-brand-700"
            : "border border-gray-300 text-gray-800 hover:bg-gray-50"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved" : "Save College"}
      </button>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
