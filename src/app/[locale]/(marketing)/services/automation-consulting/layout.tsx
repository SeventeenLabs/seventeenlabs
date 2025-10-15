import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation Consulting Services | Seventeen Labs',
  description: 'Expert automation consulting to optimize your business processes. From strategy to implementation and training.',
};

export default function AutomationConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
