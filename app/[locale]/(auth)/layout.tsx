import BlueBlob from "@/components/landing/blobs/blue-blob";
import OrangeBlob from "@/components/landing/blobs/orange-blob";
import { Toaster } from "@/components/ui/sonner";
import { constructMetadata } from "@/lib/constructMetadata";

export const metadata = constructMetadata({
  title: "VastgoedFotoAI.nl",
  description: "Transform property photos with AI",
  noIndex: true,
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f8fa] p-4">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 animate-spin-slower opacity-30">
        <OrangeBlob className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-[800px] w-[800px] -translate-x-1/3 translate-y-1/2 animate-float-slow opacity-30">
        <BlueBlob className="h-full w-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">{children}</div>
      <Toaster position="top-center" />
    </div>
  );
}
