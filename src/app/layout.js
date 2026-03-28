import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Image from "next/image";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

export const metadata = {
  // 🔁 replace with real domain
  metadataBase: new URL("https://dave-dvd.vercel.app/"),

  title: {
    default:
      "Movie Rent - Graduation Project | Online Movie Rental System by Pichaiyut Sirianantawong",
    template: "%s | Movie Rent", // Automatically turns "Batman" into "Batman | MovieRent"
  },

  description:
    "Movie Rent is a Graduation Project developed by Pichaiyut Sirianantawong. A full-stack online movie rental web application built with Next.js featuring authentication, admin management, and responsive design.",

  keywords: [
    "Graduation Project",
    "Movie Rental System",
    "Next.js Project",
    "Web Application",
    "Full Stack Developer",
    "Pichaiyut Sirianantawong",
  ],

  authors: [{ name: "Pichaiyut Sirianantawong" }],

  // verification: {
  //   google: "REk6xtiXewFp7ne3ODKwuVQPDI2aKzVo5VgPU072zaU",
  // },

//   In Next.js, the openGraph object is used to define Open Graph metadata. This metadata controls how your website appears when someone shares your link on social media platforms such as Facebook, LinkedIn, Discord, or X (Twitter).
// Open Graph is a protocol originally developed by Meta Platforms to make links display nicely when shared.
// In Next.js App Router, you usually define it inside the metadata object.
  openGraph: {
    title:
      "Movie Rent - Online Movie Rental System | Graduation Project",
    description:
      "A full-stack movie rental web application built with Next.js as a graduation project.",
    url: "https://dave-dvd.vercel.app/",
    siteName: "Movie Rent",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Movie Rent - Graduation Project",
    description:
      "Full-stack movie rental system built with Next.js.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} antialiased lay`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}