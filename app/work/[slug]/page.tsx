import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies
    .filter((cs) => cs.status === "published")
    .map((cs) => ({ slug: cs.id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.id === slug);

  if (!study) notFound();

  // Temporary placeholder — Plan 03 replaces this body with cinematic scroll content
  return (
    <main className="min-h-screen bg-canvas px-8 py-32">
      <h1 className="font-display text-6xl text-ink">{study.title}</h1>
      <p className="font-sans text-ink/50 mt-4">{study.category}</p>
    </main>
  );
}
