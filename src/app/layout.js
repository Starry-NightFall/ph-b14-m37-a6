import Navbar from "@/components/Shared/Navbar";
import "./globals.css";
import Footer from "@/components/Shared/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata = {
  title: "FitLog | Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="forest" className={`${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <WorkoutProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
