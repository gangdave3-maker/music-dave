import Link from "next/link";
import BackgroundVideo from "./Components/BackgroundVDO";

export default function Home() {
  return (
    <div className="welcome flex flex-col min-w-screen min-h-screen overflow-hidden px-4">

      <BackgroundVideo/>

      {/* Title */}
      <p className="
        text-center text-white italic tracking-widest
        text-4xl sm:text-4xl md:text-6xl lg:text-6xl
        font-medium
        my-8!
      ">
        Pichaiyut Sirianantawong's Graduation Project
      </p>
      {/* Action area */}
      <div
        className="
          mt-auto
          flex flex-col gap-15
          sm:flex-row sm:flex-wrap
          justify-around
          items-center
          mb-10!
        "
      >
        <Link href="/Register" className="btn btn-primary w-full sm:w-auto text-3xl! font-bold! text-center py-2! px-4!">
          Register
        </Link>

        <span className="text-white text-4xl font-bold text-center">
          Using Next.js
        </span>

        <Link href="/login" className="btn btn-success w-full sm:w-auto text-3xl! font-bold! text-center py-2! px-4!">
          Log In
        </Link>
      </div>
    </div>
  );
}
