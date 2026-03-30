import { BookCallButton } from "@/components/BookCallButton";
import { contactContent } from "@/content/contact";

export function ContactSection() {
  return (
    <section id="contact" className="bg-canvas py-24">
      <div className="max-w-5xl mx-auto px-8">
        <p className="font-sans text-sm uppercase tracking-widest text-ink/40 mb-16">
          Get in touch
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Consulting path */}
          <div>
            <h2 className="font-display text-3xl text-ink mb-3">
              Looking for a design partner?
            </h2>
            <p className="font-sans text-ink/70 mb-6">
              Let&apos;s talk about what you&apos;re building and whether I&apos;m the right fit.
            </p>
            <BookCallButton className="bg-accent text-canvas font-sans px-6 py-3 rounded-sm hover:opacity-90 transition-opacity" />
          </div>

          {/* Hiring path */}
          <div>
            <h2 className="font-display text-3xl text-ink mb-3">Hiring?</h2>
            <p className="font-sans text-ink/70 mb-6">
              See my full work history and career background.
            </p>
            <a
              href={contactContent.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent text-accent font-sans px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors inline-block"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
