import { useState } from 'react';

interface Props {
  bibtex: string;
  label?: string;
}

export default function BibtexCopy({ bibtex, label = 'BibTeX' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium ring-1 ring-border bg-bg-elevated/60 text-fg/90 hover:ring-accent/50 transition focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Copy ${label}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
      <span className="text-xs uppercase tracking-[0.16em]">
        {copied ? 'Copied' : label}
      </span>
    </button>
  );
}
