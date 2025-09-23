export interface Workflow {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  users: number;
  rating: number;
  integrations: string[];
  price: number;
  isFree: boolean;
  features?: string[];
  requirements?: string[];
  videoUrl?: string;
}

export const workflows: Workflow[] = [
  {
    id: 1,
    title: "Lead Scoring & CRM Sync",
    description: "Automatically score leads from forms and sync to your CRM with enriched data",
    longDescription: "This comprehensive workflow automates your entire lead management process. When a new lead fills out your form, the workflow automatically scores them based on predefined criteria, enriches their data from various sources, and syncs everything to your CRM. It includes email notifications, Slack alerts, and detailed reporting.",
    category: "Sales & CRM",
    difficulty: "Intermediate",
    time: "15 min",
    users: 234,
    rating: 4.8,
    integrations: ["Gmail", "Slack", "Airtable"],
    price: 29,
    isFree: false,
    features: [
      "Automatic lead scoring based on custom criteria",
      "Data enrichment from multiple sources",
      "Real-time CRM synchronization",
      "Email and Slack notifications",
      "Detailed analytics and reporting",
      "Duplicate lead detection and merging"
    ],
    requirements: [
      "Google Forms or Typeform account",
      "CRM system (HubSpot, Salesforce, or Airtable)",
      "Email account for notifications",
      "Slack workspace (optional)"
    ],
    videoUrl: "https://example.com/demo-video"
  },
  {
    id: 2,
    title: "E-commerce Order Processing",
    description: "Complete order fulfillment from payment to shipping notifications",
    longDescription: "Streamline your entire e-commerce fulfillment process with this advanced workflow. From the moment an order is placed, this automation handles inventory updates, payment processing, customer notifications, shipping label generation, and tracking updates.",
    category: "E-commerce",
    difficulty: "Advanced",
    time: "30 min",
    users: 567,
    rating: 4.9,
    integrations: ["Shopify", "Gmail", "Slack"],
    price: 49,
    isFree: false,
    features: [
      "Automatic inventory management",
      "Payment processing and validation",
      "Customer email notifications",
      "Shipping label generation",
      "Real-time tracking updates",
      "Return and refund handling"
    ],
    requirements: [
      "Shopify store",
      "Shipping provider account (UPS, FedEx, etc.)",
      "Email service for notifications",
      "Inventory management system"
    ],
    videoUrl: "https://example.com/demo-video"
  },
  {
    id: 3,
    title: "Social Media Content Pipeline",
    description: "Schedule and publish content across multiple social platforms",
    longDescription: "Automate your social media content distribution with this beginner-friendly workflow. Create content once and have it automatically formatted, scheduled, and published across all your social media platforms with optimal timing.",
    category: "Marketing",
    difficulty: "Beginner",
    time: "10 min",
    users: 89,
    rating: 4.6,
    integrations: ["Google Calendar", "Slack"],
    price: 0,
    isFree: true,
    features: [
      "Multi-platform content scheduling",
      "Automatic content formatting",
      "Optimal timing suggestions",
      "Content performance tracking",
      "Team collaboration features",
      "Content calendar management"
    ],
    requirements: [
      "Social media accounts (Twitter, LinkedIn, Facebook)",
      "Google Calendar access",
      "Content creation tools",
      "Slack workspace for notifications"
    ],
    videoUrl: "https://example.com/demo-video"
  },
  {
    id: 4,
    title: "Invoice Generation & Tracking",
    description: "Generate invoices from project data and track payment status",
    category: "Finance",
    difficulty: "Intermediate", 
    time: "20 min",
    users: 156,
    rating: 4.7,
    integrations: ["Gmail", "Airtable"],
    price: 19,
    isFree: false
  },
  {
    id: 5,
    title: "Customer Support Ticket Routing",
    description: "Intelligently route support tickets based on content and urgency",
    category: "Communication",
    difficulty: "Advanced",
    time: "25 min",
    users: 345,
    rating: 4.8,
    integrations: ["Slack", "Gmail", "Airtable"],
    price: 39,
    isFree: false
  },
  {
    id: 6,
    title: "Data Backup & Sync",
    description: "Automatically backup and sync data across multiple platforms",
    category: "Data Processing",
    difficulty: "Intermediate",
    time: "18 min",
    users: 278,
    rating: 4.5,
    integrations: ["Airtable", "Google Calendar"],
    price: 0,
    isFree: true
  }
];