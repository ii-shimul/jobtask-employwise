import axios from "axios";
import login from "/src/assets/Privacy policy-rafiki.png";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const result = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", result.data.token);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex fle-col items-center justify-center ">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <img src={login} alt="" />
        </div>
        <form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full">
          <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
            Log in
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Password"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-500"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
          <div className="!mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              {loading ? "Loading..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
