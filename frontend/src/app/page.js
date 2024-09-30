import HighlightCard from "@/components/Homepage/HighlightCard";
import TopHighlight from "@/components/dashboard/TopHighlight";
import Header from "@/components/layout/Header/Header";
import TopAlert from "@/components/layout/Header/TopAlert";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[150vh]">
      <TopAlert />
      <Header />
      <HighlightCard/>
      <TopHighlight />
    </div>
  );
}
