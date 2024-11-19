import "@/styles/globals.css";
import "@fontsource/poppins"; // Certifique-se que a dependência está instalada
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import Sidebar from "@/pages/components/sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  // Rotas protegidas que utilizam o Sidebar
  const protectedRoutes = [
    "/dashboard",
    "/doacoes/cadastrar",
    "/doacoes/listar",
    "/centros/cadastrar",
    "/centros/listar",
  ];

  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  // Componente para gerenciar autenticação e redirecionamento
  const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      // Define as rotas públicas
      const publicRoutes = ["/login", "/register"];
      
      if (status === "unauthenticated" && !publicRoutes.includes(router.pathname)) {
        router.push("/login");
      }
    }, [status, router]);

    if (status === "loading") {
      // Enquanto a sessão é carregada, exibe um spinner
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      );
    }

    return <>{children}</>;
  };

  return (
    <SessionProvider session={session}>
      <AuthGuard>
        {isProtectedRoute ? (
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthGuard>
    </SessionProvider>
  );
}
