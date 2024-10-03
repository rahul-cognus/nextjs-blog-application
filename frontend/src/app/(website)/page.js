import HighlightCard from "@/components/Homepage/HighlightCard";
import SponsoredSlider from "@/components/Homepage/SponsoredSlider";
import TopHighlight from "@/components/Homepage/TopHighlight";

export default function Home() {
  return (
    <div className="h-[150vh]">
      <HighlightCard/>
      <TopHighlight />
      <SponsoredSlider />
    </div>
  );
}
