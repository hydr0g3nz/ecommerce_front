import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface JWTPayload {
  user_id: string;
  role: string;
  exp: number;
}

export const useAuth = ( isNeedAuth = false) => {
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
  
      // Early return if no token exists
      if (!token || token === "undefined") {
        console.log("No token found");
        handleNoToken();
        return false;
      }
  
      // Token exists, proceed with validation
      const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;
  
      // Check token expiration
      if (payload.exp * 1000 < Date.now()) {
        console.log("Token expired");
        refreshTokenApi();
      }
  
      console.log("payload", payload);
      setRole(payload.role);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error checking authentication:", error);
      router.push("/login");
      setLoading(false);
      return false;
    }
  };
  
  // Separate function to handle no token scenario
  const handleNoToken = () => {
    if (isNeedAuth) {
      refreshTokenApi();
      router.push("/login");
    }
    setLoading(false);
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
