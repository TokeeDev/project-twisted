"use client";

import { useState, useEffect } from "react";

import Hero from "../components/ui/Hero";
import FeaturedEvent from "../components/events/FeaturedEvent";
import Footer from "../components/ui/Footer";
import AgeVerification from "../components/ui/AgeVerification";
import FeaturedMenu from "../components/menu/FeaturedMenu";

export default function Home() {
  const [verifiedAge, setVerifiedAge] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isVerified = localStorage.getItem("ageVerified") === "true";
    if (isVerified) {
      setVerifiedAge(true);
    }
    setLoading(false);
  }, []);

  const handleVerifyAge = () => {
    setVerifiedAge(true);
    localStorage.setItem("ageVerified", "true");
  };

  if (loading) return null;

  return (
    <>
      <div
        className={`relative min-h-screen bg-black text-white font-sans ${!verifiedAge ? "blur-md filter brightness-50" : ""}`}
        data-oid="8xglbda"
      >
        <Hero data-oid="twwsqok" />
        <FeaturedEvent data-oid="9.8zq-b" />
        <FeaturedMenu data-oid="e1lric:" />
        <Footer data-oid="_:k9y4x" />
      </div>
      {!verifiedAge && (
        <AgeVerification onVerify={handleVerifyAge} data-oid="mq7hlej" />
      )}
    </>
  );
}
