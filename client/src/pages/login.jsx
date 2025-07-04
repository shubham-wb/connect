"use client";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import app from "@/utils/firebase-config";
import axios from "axios";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{ }, dispatch] = useStateProvider()


  const auth = getAuth()
  const handleGoogleLogin = async () => {

    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login success:", result.user);
    } catch (err) {
      console.error("Google login error:", err);
    }
  };
  const router = useRouter()
  const db = app
  const handleEmailLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const {
        user: { displayName, email, photoUrl: profileImage }
      } = userCred

      try {
        if (email) {
          const { data } = await axios.post(`${HOST}/check-user`, { email })
          console.log(data)
          if (!data.status) {
            dispatch({
              type: reducerCases.SET_NEW_USER,
              newUser: true
            })

            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                name, email, profileImage, status: ""
              }
            })

            router.push("/onboarding")
          }
        }
      } catch (err) {
        console.log(err)
      }

      console.log("Email login success:", userCred.user);
    } catch (err) {
      console.error("Email login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6 p-4">
      <div className="flex items-center justify-center gap-4">
        <Image src={"/whatsapp.gif"} alt="Whatsapp" height={100} width={100} />
        <span className="text-5xl font-bold text-white">Whatsapp</span>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-3 rounded w-80 bg-white text-black"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-3 rounded w-80 bg-white text-black"
      />

      <button
        onClick={handleEmailLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded w-80"
      >
        Login with Email
      </button>

      <button
        className="flex items-center justify-center gap-4 bg-white text-black px-6 py-3 rounded w-80"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-3xl" />
        <span>Login with Google</span>
      </button>
    </div>
  );
}

export default Login;
