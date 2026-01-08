"use client";

// app/learn/git/page.tsx
// Страница с обучающим материалом по Git (перенаправляет на /gift)

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GitPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/gift");
  }, [router]);
  
  return null;
}




