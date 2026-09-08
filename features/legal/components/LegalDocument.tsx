import Link from "next/link";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

interface LegalDocumentProps {
  title: string;
  eyebrow: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalDocument({
  title,
  eyebrow,
  intro,
  updated,
  sections,
}: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 border-b border-border pb-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold tracking-tight text-primary transition-opacity hover:opacity-75"
            >
              El-Bus Fen
            </Link>
            <nav
              aria-label="Legal pages"
              className="flex gap-4 text-xs text-muted-foreground"
            >
              <Link className="hover:text-foreground" href="/privacy-policy">
                Privacy
              </Link>
              <Link className="hover:text-foreground" href="/terms-of-service">
                Terms
              </Link>
            </nav>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {intro}
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            Last updated: {updated}
          </p>
        </header>

        <div className="grid gap-10 sm:grid-cols-[11rem_1fr]">
          <aside className="hidden sm:block">
            <p className="sticky top-8 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              El-Bus Fen
            </p>
          </aside>
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4 text-sm leading-7 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
          <Link
            href="/login"
            className="font-medium text-primary hover:opacity-75"
          >
            Back to El-Bus Fen
          </Link>
        </footer>
      </div>
    </main>
  );
}
