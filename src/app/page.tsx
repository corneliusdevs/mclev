import HomeHero from "@/components/HomeHero";
import Homecontent from "@/components/Homecontent";
import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";


export default function Home() {
  return (
    <main className="">
      <MaxwidthWrapper>
        <HomeHero />
        <Homecontent />
      </MaxwidthWrapper>
    </main>
  );
}
