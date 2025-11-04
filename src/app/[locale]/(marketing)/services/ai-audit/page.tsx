import AuditHero from "@/components/services/audit/audit-hero";
import WhatIsAudit from "@/components/services/audit/what-is-audit";
import AuditProcess from "@/components/services/audit/audit-process";
import AuditDeliverables from "@/components/services/audit/audit-deliverables";
import AuditCta from "@/components/services/audit/audit-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AiAuditPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <AuditHero />
      <WhatIsAudit />
      <AuditProcess />
      <AuditDeliverables />
      <AuditCta />
    </main>
  );
}
