import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (router.query.error) {
			if (router.query.error === "OAuthCreateAccount") {
				toast.error("Unable to signin. The user email may be already in use.");
			} else {
				toast.error(`Authentication error: ${router.query.error.toString()}`);
			}
		}
	}, [router]);

	async function onSignin(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const signInResult = await signIn("credentials", {
			redirect: false,
			email,
			password
		});
		if (signInResult?.ok) {
			window.location.href = "/";
		} else {
			toast.error("Signin failed. Please check your email and password.");
		}
	}

	return <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
		<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
			<div className="absolute inset-0 bg-zinc-900" />
			<div className="relative z-20 flex items-center text-lg font-medium">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="mr-2 h-6 w-6"
				>
					<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
				</svg>
          Logo
			</div>
			<div className="relative z-20 mt-auto">
				<blockquote className="space-y-2">
					<p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
					</p>
					<footer className="text-sm">Sofia Davis</footer>
				</blockquote>
			</div>
		</div>


		<div className="flex h-full items-center p-4 lg:p-8">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
              Create an account
					</h1>
					<p className="text-sm text-muted-foreground">
              Enter your email below to create your account
					</p>
				</div>


				<form className="mt-8" action="#" onSubmit={(e) => void onSignin(e)}>
					<div className="mb-6">
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Your email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
							placeholder="Email address"
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Your password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
							required
						/>
					</div>
					<div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								name="remember"
								type="checkbox"
								className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
							/>
						</div>
						<div className="ml-3 text-sm">
							<label htmlFor="remember" className="font-medium text-gray-900">
                                    Remember me
							</label>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row gap-4 mt-4">
						<button className="btn btn-primary w-full lg:w-fit" type="submit">
                                Login to your account
						</button>

						<div
							className="btn btn-outline w-full lg:w-fit"
							onClick={() => void signIn("discord", { callbackUrl: "/" })}
						>
                                Sign in with Discord
						</div>
					</div>

					<div className="mt-4 text-sm font-medium text-gray-500">
                            Not registered?{" "}
						<Link href="/signup" className="text-primary">
                                Create account
						</Link>
					</div>
				</form>


				<p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
					<Link
						href="/terms"
						className="underline underline-offset-4 hover:text-primary"
					>
              Terms of Service
					</Link>{" "}
            and{" "}
					<Link
						href="/privacy"
						className="underline underline-offset-4 hover:text-primary"
					>
              Privacy Policy
					</Link>
            .
				</p>
			</div>
		</div>
	</div>;
}
