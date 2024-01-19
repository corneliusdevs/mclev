import HomeHero from "@/components/HomeHero";
import MaxwidthWrapper from "@/components/MaxwidthWrapper";
import Construction from "@/components/construction";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="">
      <MaxwidthWrapper>
        <HomeHero />
      </MaxwidthWrapper>
    </main>
  );
}
