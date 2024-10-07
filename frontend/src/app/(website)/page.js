import HighlightCard from "@/components/Homepage/HighlightCard";
import SponsoredSlider from "@/components/Homepage/SponsoredSlider";
import TopHighlight from "@/components/Homepage/TopHighlight";
import TrendingStripSlider from "@/components/Homepage/TrendingStripSlider";

export default function Home() {
  return (
    <div className="h-[150vh]">
      <TrendingStripSlider />
      <HighlightCard/>
      <TopHighlight />
      <SponsoredSlider />
    </div>
  );
}
