import "~/styles/globals.css";

export const metadata = {
  title: "Ecommerce",
  description: "shopping",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex w-screen items-center justify-center">
      {children}
    </div>
  );
}
