import HomeHeroSlider from "@/components/HomeHeroSlider";
import Homecontent from "@/components/HomeContent/Homecontent";
import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";

export default function Home() {
  return (
    <MaxwidthWrapper>
      <main className="">
        <HomeHeroSlider />
        {/* <HomeHero /> */}
        <Homecontent />
      </main>
    </MaxwidthWrapper>
  );
}
