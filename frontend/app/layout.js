import "./globals.css";

export const metadata = {
  title: "Forum",
  description: "Um fórum.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
