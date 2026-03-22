import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyHero } from "@/components/CaseStudyHero";
import { CaseStudyChapters } from "@/components/CaseStudyChapters";

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

  return (
    <main>
      <CaseStudyHero study={study} />
      <CaseStudyChapters study={study} />
    </main>
  );
}
