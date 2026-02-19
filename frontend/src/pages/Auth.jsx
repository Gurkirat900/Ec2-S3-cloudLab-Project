import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Auth({setToken}) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
  try {
    if (isLogin) {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.token);
      setToken(res.data.data.token);
      navigate("/dashboard");

    } else {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.token);
      setToken(res.data.data.token);
      navigate("/dashboard");
    }
  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 bg-[#0f172a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 bg-[#0f172a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 bg-[#0f172a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-sm mt-4 text-gray-400 cursor-pointer hover:text-blue-400"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
