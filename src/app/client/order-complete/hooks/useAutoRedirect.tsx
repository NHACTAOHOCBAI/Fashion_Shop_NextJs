import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UseAutoRedirectReturn {
  countdown: number;
}

export function useAutoRedirect(
  destination: string,
  seconds: number = 10
): UseAutoRedirectReturn {
  const router = useRouter();
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(destination);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, destination, router]);

  return { countdown };
}
