"use client";
import { GoogleLogin } from "@react-oauth/google";
import { verifyGoogleToken } from "./utils/jwt";
import { Login } from "./apis/loginActions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 gap-2">
      <p>Login into El Bus Fen:</p>
      <GoogleLogin
        onSuccess={(response) =>
          Login({ authType: "google", credential: response.credential || "" })
        }
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}
