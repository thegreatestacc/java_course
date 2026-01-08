import Link from "next/link";

interface FooterProps {
  backLink?: {
    href: string;
    text: string;
  };
  links?: Array<{
    href: string;
    text: string;
  }>;
}

export function Footer({ backLink, links }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border-main)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          {backLink && (
            <Link className="hover:text-[var(--text-main)]" href={backLink.href}>
              {backLink.text}
            </Link>
          )}
          {links?.map((link, index) => (
            <Link key={index} className="hover:text-[var(--text-main)]" href={link.href}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}


