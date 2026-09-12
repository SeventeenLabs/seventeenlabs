import LandingHeader from "@/components/landing-header";
import SeventeenLabsLanding from "@/components/seventeenlabs-landing";
import SiteFooter from "@/components/site-footer";
import StructuredData from "@/components/structured-data";

export default function RootPage() {
  return (
    <>
      <StructuredData />
      <LandingHeader />
      <SeventeenLabsLanding />
      <SiteFooter />
    </>
  );
}
