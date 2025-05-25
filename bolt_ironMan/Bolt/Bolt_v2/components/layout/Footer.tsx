import { Container } from "@/components/ui/Container";
import { LaptopIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#C5C5C5]/10 bg-[#121212] py-12">
      <Container>
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center">
            <LaptopIcon className="mr-2 h-8 w-8 text-[#64F3FF]" />
            <span className="text-xl font-bold text-[#FFB300]">Kid Book Builder</span>
          </div>
          
          <div className="flex space-x-6">
            <p className="text-sm text-[#C5C5C5]">
              &copy; {new Date().getFullYear()} Kid Book Builder. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-16 rounded bg-gradient-to-r from-[#E3000B] to-[#FF4B4B]"></div>
        </div>
      </Container>
    </footer>
  );
}