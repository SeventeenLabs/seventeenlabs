export const pricingPlans = [
  {
    id: "creator",
    name: "Early Access Creator",
    price: "$79/month",
    audience: "For solo AI filmmakers.",
    cta: "Start Creator",
    clickEvents: ["creator_clicked", "creator_plan_clicked"],
    intro: "For solo filmmakers and creators building shorts, trailers, music videos, or episodic content.",
    features: [
      "Production Bible",
      "Script-to-shot planning",
      "Continuity locks",
      "Canvas workflow",
      "Monthly generation credits",
      "Buy more credits anytime",
    ],
  },
  {
    id: "pro",
    name: "Early Access Pro",
    price: "$149/month",
    audience: "For creators producing regularly.",
    cta: "Start Pro",
    clickEvents: ["pro_clicked", "pro_plan_clicked"],
    intro: "For serious creators making recurring AI series, higher-volume projects, or client work.",
    features: [
      "Everything in Creator",
      "More projects and credits",
      "Shot compare and repair tools",
      "Model routing",
      "Priority feature access",
    ],
  },
  {
    id: "studio",
    name: "Studio Access",
    price: "$299/month",
    audience: "For teams and client production.",
    cta: "Apply for Studio access",
    clickEvents: ["studio_clicked", "studio_plan_clicked"],
    intro: "For small agencies, creative studios, and teams.",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Reviews and approvals",
      "Shared asset library",
      "Higher credit limits",
      "Priority support",
    ],
  },
] as const;

export type PricingPlan = (typeof pricingPlans)[number];
export type PricingPlanId = PricingPlan["id"];

export const creditNotes = [
  "Each plan includes monthly generation credits.",
  "Additional credits are available anytime.",
  "Credit cost varies by model, duration, resolution, and generation type.",
];

export const toolOptions = ["Runway", "Higgsfield", "Kling", "Veo", "Midjourney", "ComfyUI", "Other"];

export function getPlanById(planId: string | undefined) {
  return pricingPlans.find((plan) => plan.id === planId) ?? pricingPlans[0];
}
