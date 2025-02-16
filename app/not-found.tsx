import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";



export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="container mx-auto max-w-2xl">
        <div className="flex flex-col items-center space-y-12">
          {/* Animated 404 illustration */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float">
            <Image
              src="/404.svg"
              alt="404 Illustration"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>

          {/* Error message with enhanced styling */}
          <div className="space-y-6 text-center">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-wider">
              4
              <span className="text-primary animate-pulse inline-block mx-1">0</span>
              4
            </h1>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-700 tracking-tight">
                Page Not Found
              </h2>
              
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed px-4">
  {"The page you're looking for seems to have wandered off. Let's get you back on track!"}
</p>


            </div>
          </div>

          {/* Action buttons with improved styling */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs">
            <BackButton className="w-full sm:w-auto" />
            <Link href="/" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary hover:text-white transition-colors"
              >
                Home Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}