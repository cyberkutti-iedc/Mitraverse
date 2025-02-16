import TestimonialsCarousel from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types.",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling.",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link.",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Mitraverse account." },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings.",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues.",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically.",
  },
];

const Home = () => {
  return (
    <main className="container mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-6xl font-extrabold bg-gradient-to-br from-green-500 to-green-700 bg-clip-text text-transparent leading-tight pb-6">
            Effortless Event Planning
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl leading-relaxed">
            <span className="font-bold text-green-600 dark:text-green-400">
              Mitraverse
            </span>{" "}
            empowers you to take control of your time. Effortlessly create
            events, set your availability, and let others book time with you—
            seamlessly and efficiently.
          </p>

          <Link href={"/dashboard"}>
            <Button size="lg" className="text-lg bg-green-600 hover:bg-green-700">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/person.png"
              alt="Scheduling illustration"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mb-24">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-600">
  Powerful Features You&apos;ll Love
</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
        <Card key={index} className="shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-green-100 dark:border-green-900">
          <CardHeader className="space-y-4">
            <feature.icon className="w-14 h-14 text-green-600 mb-4 mx-auto transform hover:rotate-12 transition-transform" />
            <CardTitle className="text-center text-xl text-green-700 dark:text-green-400 font-bold">
          {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
          {feature.description}
            </p>
          </CardContent>
        </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">
          What Our Users Say
        </h2>
        <TestimonialsCarousel />
      </div>

      {/* How It Works Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Streamlined Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
        <div
          key={index}
          className="text-center bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-green-800 rounded-xl p-8 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 border border-green-100 dark:border-green-700"
        >
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg transform -rotate-3">
            {index + 1}
          </div>
          <h3 className="font-bold text-xl mb-3 text-green-800 dark:text-green-200">
            {step.step}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {step.description}
          </p>
        </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-12 text-center shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-extrabold mb-4 animate-fadeIn">
        Transform Your Scheduling Experience
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed animate-slideUp">
  Join innovative teams and professionals who&#39;ve revolutionized their time management
  with Mitraverse&#39;s intelligent scheduling solution.
</p>

          <div className="animate-bounce-slow">
        <Link href={"/dashboard"}>
        <Button size="lg" variant="secondary" className="text-green-600 bg-white hover:bg-green-50 transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg px-8 py-6">
  Get Started - It&#39;s Free <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
</Button>

        </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>
      
    </main>
  );
};

export default Home;
