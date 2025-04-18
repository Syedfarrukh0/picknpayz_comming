"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  ShoppingCart,
  Package,
  Gift,
  CreditCard,
  Truck,
  Mail,
  Heart,
  Tag,
} from "lucide-react";
import { FaFacebookSquare, FaWhatsapp } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { sendMail } from "./actions";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [iconStyles, setIconStyles] = useState<Array<React.CSSProperties>>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Define start and end dates
  const startDate = new Date("2023-10-01T00:00:00"); // Replace with your start date
  const endDate = new Date("2025-04-11T23:59:59"); // Replace with your end date

  // Generate random icon styles only on the client side
  useEffect(() => {
    setIsMounted(true);
    const ecommerceIcons = [
      ShoppingBag,
      ShoppingCart,
      Package,
      Gift,
      CreditCard,
      Truck,
      Heart,
      Tag,
    ];
    const styles = ecommerceIcons.flatMap((_, i) =>
      [...Array(3)].map((_, j) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`,
        animation: `float-icon ${
          Math.random() * 20 + 15
        }s infinite ease-in-out`,
        animationDelay: `${Math.random() * 5}s`,
      }))
    );
    setIconStyles(styles);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    setLoading(true);
    const res = await sendMail(formdata);
    if (res.success) {
      setSubmitted(true);
      setEmail("");
      setLoading(false);
    } else {
      // console.log(res?.error);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#FAEBEF" }}
    >
      {/* Clean gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#FAEBEF] to-[#F8E4EA] z-0"></div>

      {/* Subtle decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#333D79]/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#333D79]/5 rounded-tr-full"></div>
      </div>

      {/* Animated e-commerce background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {isMounted &&
          iconStyles.map((style, i) => {
            const Icon = [
              ShoppingBag,
              ShoppingCart,
              Package,
              Gift,
              CreditCard,
              Truck,
              Heart,
              Tag,
            ][Math.floor(i / 3)];
            return (
              <div key={i} className="absolute opacity-10" style={style}>
                <Icon
                  size={Math.floor(Math.random() * 40) + 30}
                  style={{ color: "#333D79" }}
                />
              </div>
            );
          })}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="container mx-auto py-6 px-4 flex justify-center">
          <div className="flex items-center justify-center w-[20rem] h-[10rem] mt-5">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={100}
              className="object-cover"
            />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-6xl mx-auto w-full">
            {/* Hero section with product preview */}
            <div className="relative mb-16">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#333D79] to-[#5D6CB3] opacity-90 blur-lg"></div>
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Coming soon content */}
                  <div className="lg:w-1/2 bg-white p-8 md:p-12">
                    <div
                      className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full"
                      style={{ backgroundColor: "#FAEBEF", color: "#333D79" }}
                    >
                      Opening Soon
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#cb416b] to-[#5D6CB3]">
                      Your Ultimate Shopping Destination
                    </h2>

                    <p className="text-xl mb-8 text-gray-600">
                      We&apos;re putting the final touches on a revolutionary
                      shopping experience. Get ready to discover amazing
                      products at incredible prices.
                    </p>

                    {/* Countdown timer */}
                    <div className="grid grid-cols-4 gap-2 mb-8">
                      {[
                        { value: timeLeft.days, label: "Days" },
                        { value: timeLeft.hours, label: "Hours" },
                        { value: timeLeft.minutes, label: "Minutes" },
                        { value: timeLeft.seconds, label: "Seconds" },
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="bg-gradient-to-br from-[#333D79] to-[#5D6CB3] rounded-lg p-3 text-white">
                            <div className="max-md:text-xl text-3xl font-bold">
                              {item.value}
                            </div>
                          </div>
                          <div className="text-xs mt-1 font-medium text-gray-500 uppercase truncate">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <p className="text-gray-600 font-medium">
                          Be the first to shop when we launch:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 pt-0 border-2 border-[#333D79] max-md:min-h-10 min-h-12"
                          />
                          <Button
                            type="submit"
                            className="h-12 px-6 text-base font-medium transition-all duration-300 transform hover:scale-105"
                            style={{
                              background:
                                "linear-gradient(to right, #333D79, #5D6CB3)",
                            }}
                          >
                            {loading ? "Sending..." : "Notify Me"}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg">
                        <p className="font-medium">
                          Thank you! We&apos;ll notify you when we launch.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side - Shopping illustration */}
                  <div className="lg:w-1/2 bg-gradient-to-br from-[#333D79] to-[#5D6CB3] p-8 md:p-12 text-white flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-md mx-auto">
                      {/* Large shopping bag illustration */}
                      <div className="relative z-10 flex items-center justify-center mb-8">
                        <ShoppingBag className="h-32 w-32 text-white opacity-90" />
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl transform scale-150"></div>
                      </div>

                      {/* Floating shopping elements */}
                      <div className="absolute top-0 right-0 animate-bounce-slow">
                        <ShoppingCart className="h-12 w-12 text-white/70" />
                      </div>
                      <div className="absolute bottom-12 left-0 animate-pulse">
                        <Package className="h-14 w-14 text-white/70" />
                      </div>
                      <div className="absolute top-20 left-10 animate-bounce-slow delay-300">
                        <Tag className="h-10 w-10 text-white/70" />
                      </div>

                      {/* Promotional text */}
                      <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          Redefining Online Shopping
                        </h3>
                        <p className="text-white/80 mb-6">
                          Get ready for a seamless shopping experience with
                          carefully curated products at amazing prices.
                        </p>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                          <Tag className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            Exclusive launch discounts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: ShoppingCart,
                  title: "Easy Shopping",
                  description:
                    "Intuitive interface for a seamless shopping experience from browsing to checkout.",
                },
                {
                  icon: CreditCard,
                  title: "Secure Payments",
                  description:
                    "Multiple payment options with state-of-the-art security to protect your information.",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  description:
                    "Quick shipping options to get your purchases to your doorstep in record time.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#333D79] to-[#5D6CB3] opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
                  <div className="relative h-full bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#333D79] to-[#5D6CB3] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "#333D79" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter section */}
            <div className="relative mb-16">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#333D79] to-[#5D6CB3] opacity-70 blur-md"></div>
              <div className="relative p-8 md:p-12 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-2/3">
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-4"
                      style={{ color: "#cb416b" }}
                    >
                      Get Exclusive Launch Offers
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Subscribe to our newsletter and be the first to receive
                      special discounts, early access to new products, and VIP
                      shopping events.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          Early Access
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          Special Discounts
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 w-full">
                    <div className="bg-gradient-to-br from-[#cb416b] to-[#d16686] p-6 rounded-lg text-white text-center">
                      <Gift className="h-12 w-12 mx-auto mb-4" />
                      <p className="font-bold text-xl mb-2">Launch Discount</p>
                      <p className="text-3xl font-bold mb-2">50% OFF</p>
                      <p className="text-sm mb-4">on your first purchase</p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4">
                        <p className="font-mono font-bold">WELCOME</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer
          className="relative py-10 px-4"
          style={{ backgroundColor: "#333D79" }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center text-white">
                  <ShoppingBag className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">picknpayz</span>
                </div>
                <p className="mt-2 text-white/70 max-w-md">
                  Your one-stop destination for all your shopping needs. Quality
                  products, competitive prices, and exceptional service.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <div className="flex space-x-4 mb-4">
                  {[FaFacebookSquare, RiInstagramFill, AiFillTikTok].map(
                    (Icon, i) => (
                      <Link
                        key={i}
                        href={
                          i === 0
                            ? "https://www.facebook.com/share/15wDzrHyVv/"
                            : i === 1
                            ? "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=xkjjdjr"
                            : i === 2
                            ? "https://www.tiktok.com/@picknpayz?_t=ZS-8uhB7YQAwzN&_r=1"
                            : ""
                        }
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                      >
                        <Icon className="h-5 w-5 text-white" />
                        <span className="sr-only">Social media</span>
                      </Link>
                    )
                  )}
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center text-white">
                    <Mail className="h-5 w-5 mr-2" />
                    <a
                      href="mailto:picknpayz.pk@gmail.com"
                      className="hover:underline"
                    >
                      picknpayz.pk@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center text-white">
                    <FaWhatsapp className="h-5 w-5 mr-2" />
                    <a href="tel:+923128091650" className="hover:underline">
                      0312-8091650
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
              <p>
                &copy; {new Date().getFullYear()} picknpayz. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* WhatsApp Floating Icon */}
        <div className="fixed bottom-3 right-6 z-50">
          <Link
            href="https://wa.me/923128091650" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <FaWhatsapp className="h-8 w-8 text-[green]" />
          </Link>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float-icon {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}