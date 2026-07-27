import "./globals.css";

export const metadata = {
  title: {
    default: "Tan Su · KylianSu",
    template: "%s · KylianSu",
  },
  description:
    "Tan Su is a SUSTech undergraduate and researcher working on embodied AI, generative models, diffusion models, and world models.",
  keywords: [
    "Tan Su",
    "KylianSu",
    "robot learning",
    "embodied AI",
    "generative models",
    "diffusion policy",
    "SUSTech",
  ],
  authors: [{ name: "Tan Su" }],
  openGraph: {
    title: "Tan Su · KylianSu",
    description:
      "Tan Su's academic homepage: embodied AI, generative models, research experience, publications, and football.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
