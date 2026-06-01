import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin sign-in · Platypus CMS",
};

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen bg-[#0B132B] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00BCD4]/[0.05] blur-3xl rounded-full pointer-events-none" />

      <Link
        href="/"
        className="absolute top-5 left-5 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 text-[13px] text-[#9CA3AF] hover:text-[#00BCD4] px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur transition-colors z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to site
      </Link>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-7">
          <Link href="/" className="flex items-center gap-3 mb-5 group">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Platypus"
                fill
                sizes="48px"
                priority
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] tracking-[0.18em] uppercase text-[#7DD3FC] font-semibold">
                Platypus
              </span>
              <span className="text-[18px] font-bold text-white -mt-0.5">
                Content Studio
              </span>
            </div>
          </Link>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-white text-center tracking-tight">
            Sign in to continue
          </h1>
          <p className="text-[14px] text-[#9CA3AF] text-center mt-1.5 max-w-xs">
            Access the admin to edit site content, gallery, and reviews.
          </p>
        </div>

        <SignIn
          path="/admin/login"
          routing="path"
          signUpUrl="/admin/login"
          fallbackRedirectUrl="/admin"
          appearance={{
            variables: {
              colorPrimary: "#00BCD4",
              colorBackground: "#0F1530",
              colorText: "#EDEDED",
              colorTextSecondary: "#9CA3AF",
              colorInputBackground: "#0B132B",
              colorInputText: "#EDEDED",
              borderRadius: "12px",
              fontFamily: "Sora, system-ui, sans-serif",
            },
            elements: {
              rootBox: "w-full",
              card: "bg-[#0F1530] border border-white/[0.06] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] rounded-2xl",
              headerTitle: "text-white text-[18px] font-semibold",
              headerSubtitle: "text-[#9CA3AF] text-[13.5px]",
              socialButtonsBlockButton:
                "bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.06] transition",
              socialButtonsBlockButtonText: "text-white font-medium",
              dividerLine: "bg-white/[0.06]",
              dividerText: "text-[#6B7280] text-[12px]",
              formFieldLabel: "text-[#9CA3AF] text-[12.5px] font-medium",
              formFieldInput:
                "bg-[#0B132B] border border-white/[0.08] text-white focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]/30 rounded-xl",
              formButtonPrimary:
                "bg-[#00BCD4] hover:bg-[#00BCD4]/90 text-[#0B132B] font-bold normal-case text-[14px] shadow-[0_8px_24px_-8px_rgba(0,188,212,0.6)] rounded-xl transition",
              footerActionLink: "text-[#7DD3FC] hover:text-[#00BCD4] font-medium",
              footerActionText: "text-[#9CA3AF] text-[13px]",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-[#7DD3FC] hover:text-[#00BCD4]",
              formFieldAction: "text-[#7DD3FC] hover:text-[#00BCD4]",
              otpCodeFieldInput:
                "bg-[#0B132B] border-white/[0.08] text-white focus:border-[#00BCD4]",
            },
          }}
        />

        <p className="text-center text-[12px] text-gray-500 mt-6">
          Protected area · authorized users only
        </p>
      </div>
    </div>
  );
}
