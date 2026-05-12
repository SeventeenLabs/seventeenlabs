import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
	return (
		<div className="min-h-screen bg-black">
			<LandingHeader />
			{children}
			<SiteFooter />
		</div>
	);
}

