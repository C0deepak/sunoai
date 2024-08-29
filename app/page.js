import IPhone from "@/components/iphone/IPhone";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-8 items-center justify-center w-full px-6 md:px-20 pt-20 pb-4">
        <h1 className='text-6xl font-bold text-center'>Turn audio into content, <br /> like magic.</h1>
        <p>Simple it is, either upload your content or upload the voice and <span className="font-semibold">get the next you want</span></p>
        <Button className='items-center gap-2 rounded-full'>Try it now <ArrowUpRight size={18} /></Button>
      </div>
      <IPhone />
    </div>
  );
}
