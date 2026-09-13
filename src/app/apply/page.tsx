import type { Metadata } from "next";
import { AccessForm } from "@/components/company/access-form";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
export const metadata: Metadata = {
  title: "Early access",
  description:
    "Join the early-access list for Frame, our generative video editor. Product news and updates from SeventeenLabs.",
  alternates: { canonical: "/apply" },
};
export default function ApplyPage() {
  return (
    <>
      <LandingHeader />
      <main id="main" className="sl-site">
        <section className="sl-apply sl-container">
          <div>
            <p className="sl-eyebrow">BE PART OF WHAT’S NEXT</p>
            <h1>
              Good things
              <br />
              start with
              <br />a little curiosity.
            </h1>
            <p className="sl-apply-intro">
              We’re building a new kind of video editor. Join the list for a
              closer look, product updates, and early-access invitations.
            </p>
            <p className="sl-apply-note">
              Free to join. No payment details.
              <br />
              Frame is in development. We’ll share more as it takes shape.
            </p>
          </div>
          <AccessForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
