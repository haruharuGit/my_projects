import axios from "axios";
import { useState, useEffect } from "react";

// 新規登録：未使用：後ほど移植してくる
export const registerUser = async (email, password, passwordConfirmation) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// ログイン：未使用：後ほど移植してくる
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/sign_in`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//ログアウト
export const logoutUser = async () => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/sign_out`, {
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
    });

    if (response.status === 200) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("client");
      localStorage.removeItem("uid");
    }

    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// ユーザー認証し、user_id取得
export const useAuthUserId = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchGetUserId();
  }, []);

  const fetchGetUserId = async () => {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!accessToken || !client || !uid) {
      alert("認証情報が見つかりません。ログインし直してください。");
      setError("Authentication token is missing");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/users/check_user_id`,
        {
          headers: {
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        setUserId(res.data.id);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error("ユーザーIDの取得に失敗しました:", error);
      setError("Failed to fetch user ID");
    } finally {
      setIsLoading(false);
    }
  };

  return { userId, isLoading, error };
};
