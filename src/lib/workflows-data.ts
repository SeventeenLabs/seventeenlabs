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
  mermaidChart?: string;
  previewChart?: string; // Obfuscated version for paid workflows
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
    videoUrl: "https://example.com/demo-video",
    mermaidChart: `
flowchart LR
    A["New Lead Form"] --> B{"Lead Data Valid?"}
    B -->|"Yes"| C["Score Lead"]
    B -->|"No"| D["Send Error Alert"]
    C --> E["Enrich Data"]
    E --> F{"Check Score Threshold"}
    F -->|"High Score"| G["Add to Hot Leads"]
    F -->|"Medium Score"| H["Add to Warm Leads"]  
    F -->|"Low Score"| I["Add to Cold Leads"]
    G --> J["Notify Sales Team"]
    H --> K["Schedule Follow-up"]
    I --> L["Add to Nurture Campaign"]
    J --> M["Sync to CRM"]
    K --> M
    L --> M
    M --> N["Send Slack Alert"]
    M --> O["Update Dashboard"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef hotNode fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#374151
    classDef endNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#374151
    
    class A startNode
    class C,E processNode
    class B,F decisionNode
    class G hotNode
    class M,N,O endNode
    `,
    previewChart: `
flowchart LR
    A["New Lead Form"] --> B{"Data Validation"}
    B -->|"Valid"| C["Lead Processing"]
    B -->|"Invalid"| D["Send Error Alert"]
    C --> E["Score Calculation"]
    E --> F{"Priority Assessment"}
    F -->|"High"| G["Premium Pipeline"]
    F -->|"Low"| H["Standard Pipeline"]
    G --> I["Advanced Enrichment"]
    H --> I
    I --> J["CRM Integration"]
    J --> K["Data Mapping"]
    K --> L["Field Updates"]
    L --> M["Sync to CRM"]
    M --> N["Send Notifications"]
    D --> O["Error Handling"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef hiddenNode fill:#f5f5f5,stroke:#999,stroke-width:2px,color:#666,stroke-dasharray: 5 5
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef endNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#374151
    
    class A startNode
    class D,M,N processNode
    class C,E,G,H,I,J,K,L,O hiddenNode
    class B,F decisionNode
    `
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
    videoUrl: "https://example.com/demo-video",
    mermaidChart: `
flowchart LR
    A["New Order Placed"] --> B["Validate Payment"]
    B -->|"Success"| C["Update Inventory"]
    B -->|"Failed"| D["Send Payment Failed Email"]
    C --> E{"Stock Available?"}
    E -->|"Yes"| F["Generate Order Confirmation"]
    E -->|"No"| G["Send Backorder Notification"]
    F --> H["Print Shipping Label"]
    G --> I["Update ETA"]
    H --> J["Pack Order"]
    I --> J
    J --> K["Ship Package"]
    K --> L["Send Tracking Email"]
    L --> M["Update Order Status"]
    M --> N["Monitor Delivery"]
    N --> O{"Delivered?"}
    O -->|"Yes"| P["Send Review Request"]
    O -->|"No"| Q["Send Delivery Alert"]
    D --> R["Notify Admin"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef errorNode fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#374151
    classDef endNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#374151
    
    class A startNode
    class B,C,F,H,J,K,L,M processNode
    class E,O decisionNode
    class D,R errorNode
    class P endNode
    `,
    previewChart: `
flowchart LR
    A["New Order Placed"] --> B["Payment Processing"]
    B -->|"Success"| C["Order Validation"]
    B -->|"Failed"| D["Send Payment Failed Email"]
    C --> E{"Stock Check"}
    E -->|"Available"| F["Order Confirmation"]
    E -->|"Low Stock"| G["Backorder Process"]
    F --> H["Label Generation"]
    G --> I["ETA Calculation"]
    H --> J["Package Preparation"]
    I --> J
    J --> K["Ship Package"]
    K --> L["Send Tracking Email"]
    L --> M["Status Updates"]
    M --> N["Delivery Monitoring"]
    N --> O{"Delivery Status"}
    O -->|"Delivered"| P["Review Request"]
    O -->|"Pending"| Q["Follow-up Alert"]
    D --> R["Notify Admin"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef hiddenNode fill:#f5f5f5,stroke:#999,stroke-width:2px,color:#666,stroke-dasharray: 5 5
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef errorNode fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#374151
    classDef endNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#374151
    
    class A startNode
    class K,L processNode
    class B,C,F,G,H,I,J,M,N,P,Q hiddenNode
    class E,O decisionNode
    class D,R errorNode
    `
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
    videoUrl: "https://example.com/demo-video",
    mermaidChart: `
flowchart LR
    A["Create Content"] --> B["Content Scheduler"]
    B --> C{"Platform Check"}
    C -->|"Twitter"| D["Format for Twitter"]
    C -->|"LinkedIn"| E["Format for LinkedIn"]
    C -->|"Facebook"| F["Format for Facebook"]
    D --> G["Schedule Tweet"]
    E --> H["Schedule LinkedIn Post"]
    F --> I["Schedule Facebook Post"]
    G --> J["Add to Calendar"]
    H --> J
    I --> J
    J --> K["Send Team Notification"]
    K --> L{"Publish Time?"}
    L -->|"Yes"| M["Publish Content"]
    L -->|"No"| N["Wait for Schedule"]
    M --> O["Track Performance"]
    N --> L
    O --> P["Generate Report"]
    P --> Q["Send Analytics Email"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef socialNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#374151
    classDef endNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    
    class A startNode
    class B,D,E,F,G,H,I,J,K,M,O,P processNode
    class C,L decisionNode
    class Q endNode
    `
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
  },
  {
    id: 7,
    title: "AI-Powered Feedback Analysis",
    description: "Automatically analyze and categorize customer feedback using OpenAI GPT models",
    longDescription: "This advanced workflow automatically processes customer feedback through an AI-powered analysis system. When feedback is submitted via webhook, it checks for existing categorization, uses OpenAI to analyze uncategorized feedback, extracts categories and tags, then updates the database with structured insights. Perfect for SaaS platforms, support teams, and product managers who need to understand customer sentiment at scale.",
    category: "AI Applications",
    difficulty: "Advanced",
    time: "25 min",
    users: 142,
    rating: 4.9,
    integrations: ["OpenAI", "Supabase", "Webhooks"],
    price: 59,
    isFree: false,
    features: [
      "AI-powered feedback categorization (bug, feature_request, question, other)",
      "Automatic tag generation for better organization",
      "Batch processing for multiple feedback items",
      "Webhook integration for real-time processing",
      "Supabase database integration",
      "Structured JSON output with OpenAI GPT-4",
      "Error handling and data validation"
    ],
    requirements: [
      "OpenAI API account with GPT-4 access",
      "Supabase database with feedback_items table",
      "Webhook endpoint configuration",
      "Basic understanding of JSON structures"
    ],
    mermaidChart: `
flowchart LR
    A["Webhook Trigger"] --> B["Parse JSON Body"]
    B --> C{"ID Exists?"}
    C -->|"Single Item"| D["Get Single Row"]
    C -->|"Batch Mode"| E["Get Batch Items"]
    D --> F{"Category Empty?"}
    E --> G["Split Into Batches"]
    F -->|"Needs Analysis"| H["OpenAI Analysis"]
    F -->|"Already Categorized"| I["Skip Processing"]
    G --> J["Process Each Item"]
    J --> K{"Category Empty?"}
    K -->|"Analyze"| H
    K -->|"Skip"| I
    H --> L["GPT-4 Analysis"]
    L --> M["Structured Output Parser"]
    M --> N["Extract Category and Tags"]
    N --> O["Update Database"]
    I --> P["Continue Loop"]
    O --> Q["Continue Loop"]
    P --> R{"More Items?"}
    Q --> R
    R -->|"Yes"| J
    R -->|"No"| S["Send Response"]
    S --> T["End"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef aiNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#374151
    classDef endNode fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#374151
    
    class A startNode
    class B,D,E,G,J,N,O processNode
    class C,F,K,R decisionNode
    class H,L,M aiNode
    class T endNode
    `,
    previewChart: `
flowchart LR
    A["Webhook Trigger"] --> B["Data Parsing"]
    B --> C{"Request Type"}
    C -->|"Single Item"| D["Single Processing"]
    C -->|"Batch Mode"| E["Batch Processing"]
    D --> F{"Category Status"}
    E --> G["Batch Splitting"]
    F -->|"Needs Analysis"| H["AI Processing"]
    F -->|"Categorized"| I["Skip Processing"]
    G --> J["Item Processing"]
    J --> K{"Analysis Required"}
    K -->|"Analyze"| H
    K -->|"Skip"| I
    H --> L["GPT Analysis"]
    L --> M["Output Parsing"]
    M --> N["Data Extraction"]
    N --> O["Update Database"]
    I --> P["Loop Continue"]
    O --> Q["Loop Continue"]
    P --> R{"More Items"}
    Q --> R
    R -->|"Yes"| J
    R -->|"No"| S["Send Response"]
    S --> T["End"]
    
    classDef startNode fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#374151
    classDef processNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#374151
    classDef hiddenNode fill:#f5f5f5,stroke:#999,stroke-width:2px,color:#666,stroke-dasharray: 5 5
    classDef decisionNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#374151
    classDef endNode fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#374151
    
    class A startNode
    class O,S processNode
    class B,D,E,G,H,I,J,L,M,N,P,Q hiddenNode
    class C,F,K,R decisionNode
    class T endNode
    `
  }
];