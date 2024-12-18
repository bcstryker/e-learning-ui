import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "@/types";

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getDecodedToken = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return null;
  }
  try {
    const decodedToken: JwtPayload = jwtDecode(token);
    return decodedToken;
  } catch (err) {
    console.log("Error decoding token:", err);
    return null;
  }
};

export const isTokenValid = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return false;
  }
  try {
    jwtDecode(token);
    return true;
  } catch (err) {
    console.log("Error decoding token:", err);
    return false;
  }
};

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const getNewToken = async (email: string, password: string) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });
  if (!response.ok) {
    throw new Error("Invalid email or password");
  }
  const data = await response.json();
  return data.token;
};

export const getAndSasveNewToken = async (email: string, password: string) => {
  const token = await getNewToken(email, password);
  saveTokenToLocalStorage(token);
  return token;
};
