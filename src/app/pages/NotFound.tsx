"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <div className="text-9xl mb-8 opacity-20">404</div>
        <h1 className="text-5xl md:text-6xl mb-6">Page Not Found</h1>
        <p className="text-xl text-foreground/70 mb-12">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home size={20} className="mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
