import axios from "axios";

const apiUrl = "http://localhost:3010/api/v1/auth";

// 新規登録
export const registerUser = async (email, password, passwordConfirmation) => {
  try {
    const response = await axios.post(`${apiUrl}/`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// ログイン
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/sign_in`, {
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
    const response = await axios.delete(`${apiUrl}/sign_out`, {
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