import axios from "axios";

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