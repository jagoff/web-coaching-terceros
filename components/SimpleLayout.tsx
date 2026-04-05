export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      {children}
    </>
  );
}
