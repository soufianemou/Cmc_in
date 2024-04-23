import { useRef, useState } from "react";
import Spinner from "../../components/spinner/spinner";
import { toast } from "react-toastify";
import customAxios from "../../api/axios";

export default function ContactUs() {
	const fullName = useRef();
	const email = useRef();
	const message = useRef();
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const fullNameVal = fullName.current.value.trim();
		const emailVal = email.current.value.trim();
		const messageVal = message.current.value.trim();
		if (emailVal === "") {
			return toast.error("email required");
		}
		if (messageVal === "") {
			return toast.error("message required");
		}
		if (fullNameVal === "") {
			return toast.error("fullName required");
		}
		const dataMessage = { fullName: fullNameVal, email: emailVal, message: messageVal };
		await customAxios.post("/contact", dataMessage)
		.then((res) => {
			setLoading(false);	
			setResponse(res.data.message);		
			fullName.current.value = "";
			email.current.value = "";
			message.current.value = "";
		})
	}
  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-100 dark:text-gray-800">
	<div className="flex flex-col justify-between">
		<div className="space-y-2">
			<h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let&apos;s talk!</h2>
			<div className="dark:text-gray-600">Vivamus in nisl metus? Phasellus.</div>
		</div>
	</div>
	<form onSubmit={handleSubmit} className="space-y-6">
		<div>
			<label htmlFor="name" className="text-sm">Full name</label>
			<input
				ref={fullName}
				type="text"
				className="w-full -ml-1q0 pl-4 pr-3q py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
				required
			/>
		</div>
		<div>
			<label htmlFor="name" className="text-sm">Email</label>
			<input
				ref={email}
				type="email"
				className="w-full -ml-1q0 pl-4 pr-3q py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
				required
			/>
		</div>
		<div>
			<label htmlFor="message" className="text-sm">Message</label>
			<textarea ref={message} id="message" rows="3" className="w-full -ml-1q0 pl-4 pr-3q py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"></textarea>
		</div>
		<div>
			<button
			disabled={loading}
			type="submit"
			className={`blocsk w-full  bg-primary hover:bg-primary focus:bg-primary text-white rounded-lg px-3 py-3 font-semibold ${
			loading && "cursor-not-allowed"
			}`}
		>
			{loading ?<Spinner /> : "Send Message"}
		</button>
		{response && <p className="text-center text-green-500 pt-2">{response}</p>}
	</div>
	</form>
</div>
  )
}
