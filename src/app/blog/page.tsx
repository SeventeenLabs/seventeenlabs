// This file is kept as a thin wrapper for backward compatibility.
// All blog listing logic and SEO are implemented in the localized
// route at `src/app/[locale]/(marketing)/blog/page.tsx`.

import { redirect } from 'next/navigation';

export default function BlogPage() {
  redirect('/blog');
}