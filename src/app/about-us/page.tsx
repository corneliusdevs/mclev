import AboutBanner from "@/components/about/AboutBanner"
import AboutCallToAction from "@/components/about/AboutCallToAction"
import HistoryComponent from "@/components/about/AboutHistory"
import FewWordsAbout from "@/components/about/FewWordsAbout"
import OurTeam from "@/components/about/OurTeam"
import TheCompanyYouCanTrust from "@/components/about/TheCompanyYouCanTrust"


const AboutPage = ()=>(
  <main>
    <AboutBanner />
    <FewWordsAbout />
    <TheCompanyYouCanTrust />
    {/* <HistoryComponent /> */}
    {/* <OurTeam /> */}
    <AboutCallToAction />
  </main>
)

export default AboutPage


