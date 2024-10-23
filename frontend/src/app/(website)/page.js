"use server";
import HighlightCard from "@/components/Homepage/HighlightCard";
import SponsoredSlider from "@/components/Homepage/SponsoredSlider";
import TopHighlight from "@/components/Homepage/TopHighlight";
import TrendingStripSlider from "@/components/Homepage/TrendingStripSlider";
import { fetchData } from "@/lib/website";

export default async function Home() {
  const posts = await fetchData(
    "/blog/all-blog?page=${currentPage}&limit=${limit}",
    "GET"
  );

  console.log("data on home page dffdg", posts);
  return (
    <div className="">
      <TrendingStripSlider />
      <HighlightCard />
      <TopHighlight posts={posts} />
      <SponsoredSlider posts={posts} />
    </div>
  );
}
