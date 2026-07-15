import Link from 'next/link';

export function FooterSection() {
  return (
    <footer className="pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-4 md:pb-6 text-muted-foreground px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <p className="text-xs text-center">&copy; pranavgg.me</p>
      </div>
    </footer>
  );
}