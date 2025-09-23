# SeventeenLabs.io - Modern Digital Agency

A modern, clean SaaS-style website built with Next.js, featuring AI tools, automation services, and digital agency solutions.

## 🚀 Features

- **Modern SaaS Design**: Clean, professional aesthetic with navy blue accents
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Subtle Framer Motion animations for enhanced UX
- **TypeScript**: Full type safety throughout the application
- **shadcn/ui Components**: Beautiful, accessible UI components
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## 🛠 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: TailwindCSS for utility-first CSS
- **Animations**: Framer Motion for smooth interactions
- **Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **Language**: TypeScript for type safety
- **Deployment**: Optimized for Vercel deployment

## 🎨 Design System

- **Primary Color**: Navy Blue (#1E3A8A - blue-900)
- **Accent Color**: Blue (#2563EB - blue-600)
- **Background**: Pure white (#FFFFFF) and light gray (#F9FAFB)
- **Typography**: Large, bold sans-serif with excellent readability
- **Animations**: Subtle fade-ins, slide-ups, and hover effects

## 📱 Services

- **Agency Services**: Custom web development and digital strategy
- **N8N Workflows**: Business process automation solutions
- **AI Applications**: Intelligent tools powered by cutting-edge AI

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seventeenlabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🏗 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   └── ui/            # shadcn/ui components
└── lib/               # Utility functions
```

## 🎯 Key Features Implemented


## Agency subdomain (agency.seventeenlabs.io)

This project routes all traffic from the `agency.` subdomain to the `/agency` section using Next.js host-based rewrites.

How it works:
- `next.config.ts` defines rewrites with a `has: [{ type: 'host', value: 'agency.seventeenlabs.io' }]` condition.
- Requests to `https://agency.seventeenlabs.io/anything` are internally served from `/agency/anything`.
- No middleware is used; this is a simpler, built-in Next.js approach.

Setup steps:
1. DNS: Create a CNAME for `agency` -> your deployment host (e.g., `cname.vercel-dns.com` on Vercel) or an A/AAAA per your provider.
2. Vercel project:
   - Add `agency.seventeenlabs.io` as a domain on your project.
   - Ensure the apex/root domain is also configured on the same project.
   - No Vercel Dashboard rewrites are required—the Next.js config handles it.

Local testing (optional):
- Map `127.0.0.1 agency.localhost` in your hosts file and open `http://agency.localhost:3000`.


## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 📧 Contact

For more information about SeventeenLabs services, visit [seventeenlabs.io](https://seventeenlabs.io)

---

Built with ❤️ using Next.js, TailwindCSS, and Framer Motion
