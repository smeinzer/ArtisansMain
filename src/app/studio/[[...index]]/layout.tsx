export const metadata = {
  title: 'Sanity Studio — Artisans On Main',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-studio="" className="fixed inset-0 z-50" style={{ cursor: 'auto' }}>{children}</div>
  );
}
