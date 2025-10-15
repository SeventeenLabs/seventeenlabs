import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Seventeen Labs',
  description: 'Learn about Seventeen Labs - our mission, team, and commitment to transforming businesses through AI and automation.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
