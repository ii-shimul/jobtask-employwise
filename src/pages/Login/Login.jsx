import axios from "axios";
import login from "/src/assets/Privacy policy-rafiki.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersList from "../UsersList/UsersList";
import toast from "react-hot-toast";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
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
			toast.success("Welcome!")
			navigate("/users");
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};
  if (localStorage.getItem("token")) {
		return <UsersList />;
	}

	return (
		<div className="min-h-screen flex fle-col items-center justify-center ">
			<div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
				<div>
					<img src={login} alt="" />
				</div>
				<form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full">
					<h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
						Log in to your account	
					</h3>
					<div className="space-y-2">
						<label className="text-sm text-slate-800 font-medium mb-2 block">
							Email
						</label>
						<label className="input validator w-full">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<rect width="20" height="16" x="2" y="4" rx="2"></rect>
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
								</g>
							</svg>
							<input
								name="email"
								type="email"
								placeholder="mail@site.com"
								required
							/>
						</label>
						<div className="validator-hint hidden">
							Enter valid email address
						</div>

						<label className="text-sm text-slate-800 font-medium mb-2 block">
							Password
						</label>
						<label className="input validator w-full">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
									<circle
										cx="16.5"
										cy="7.5"
										r=".5"
										fill="currentColor"
									></circle>
								</g>
							</svg>

							<input
								type="password"
								name="password"
								required
								placeholder="Password"
								minlength="8"
							/>
						</label>
						<p className="validator-hint hidden">
							Must be more than 8 characters
						</p>

					</div>
					<div className="!mt-12">
						<button
							type="submit"
							className="btn btn-neutral w-full shadow-xl focus:outline-none"
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
