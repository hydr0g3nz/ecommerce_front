import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface JWTPayload {
  user_id: string;
  role: string;
  exp: number;
}

export const useAuth = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [authloading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
      if (!token) {
        console.log("No token found");
        throw new Error("No token found");
      }

      // Decode the JWT token
      const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;

      // Check if token is expired
      if (payload.exp * 1000 < Date.now()) {
        console.log("Token expired");
        refreshTokenApi();
      }
      console.log("payload", payload);
      setRole(payload.role);
      setLoading(false);
    } catch (error) {
      console.error("Error checking authentication:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
      setLoading(false);
    }
  };
  const refreshTokenApi = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      router.push("/login");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + refreshToken },
      }
    );
    if (!response.ok) {
      router.push("/login");
    }
    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
  };
  return { role, authloading , accessToken, refreshToken};
};
