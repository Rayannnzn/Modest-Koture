// Auth pages (login, register) intentionally have no Header or Footer.
// They use a full-screen centered layout with their own branding.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
