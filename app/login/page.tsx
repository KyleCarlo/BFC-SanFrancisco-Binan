import Image from "next/image";
import GoogleButton from "../_components/googleButton";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <Image src="bfc-logo.svg" alt="bfc-logo" width={120} height={120} />
      <h1 className="text-bold text-3xl mt-4">
        <span className="textc-gold">B</span>ut{" "}
        <span className="textc-gold">F</span>irst{" "}
        <span className="textc-gold">C</span>offee
      </h1>
      <p className="mb-4">San Francisco, Biñan City</p>
      <form method="post" className="flex flex-col">
        <div className="flex mb-2 relative">
          <label
            htmlFor="email"
            className="flex justify-center items-center p-1 absolute top-1 left-1"
          >
            <FaRegUser color="black" />
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-1 text-italic pl-8 rounded-md text-black"
          />
        </div>
        <div className="flex mt-2 mb-4 relative">
          <label
            htmlFor="password"
            className="flex justify-center items-center p-1 absolute top-1 left-1"
          >
            <RiLockPasswordLine color="black" />
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-1 text-italic pl-8 rounded-md text-black"
          />
        </div>
        <button type="submit" className="p-1 rounded-md border-solid border-2">
          Login
        </button>
      </form>
      <p className="my-2">or</p>
      <GoogleButton />
    </main>
  );
}
