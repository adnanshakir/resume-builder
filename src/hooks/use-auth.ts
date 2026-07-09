import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your shadcn toast import
import { authService } from "@/services/auth.service";
import { RegisterBody, LoginBody } from "@/types/user.types";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (body: RegisterBody) => {
    setLoading(true);
    const res = await authService.register(body);
    setLoading(false);

    if (!res.success) {
      toast.error(res.message);
      return false;
    }

    toast.success("Account created successfully");
    router.push("/dashboard");
    return true;
  };

  const login = async (body: LoginBody) => {
    setLoading(true);
    const res = await authService.login(body);
    setLoading(false);

    if (!res.success) {
      toast.error(res.message);
      return false;
    }

    toast.success("Welcome back");
    router.push("/dashboard");
    return true;
  };

  return { register, login, loading };
}