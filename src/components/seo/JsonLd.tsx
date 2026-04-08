/* ================================================================
   JsonLd — Injects JSON-LD structured data into the page.
   Server component. Safe to render multiple instances per page.
   ================================================================ */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
