import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to English locale page (root is now English)
  redirect('/en');
}