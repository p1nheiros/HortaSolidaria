import "@/styles/globals.css";
import "@fontsource/poppins"; // Certifique-se que a dependência está instalada
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import Sidebar from "@/pages/components/sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define páginas que utilizam o Sidebar
  const sidebarRoutes = ["/dashboard", "/doacoes/cadastrar", "/doacoes/listar", "/centros/cadastrar", "/centros/listar"];
  const isSidebarPage = sidebarRoutes.includes(router.pathname);

  const publicRoutes = ["/login", "/register"]; // Rotas públicas, sem necessidade de autenticação

  const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession();
    const isPublicRoute = publicRoutes.includes(router.pathname);
  
    useEffect(() => {
      // Redireciona para login apenas se for uma rota protegida
      if (status === "unauthenticated" && !isPublicRoute) {
        router.push("/login");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
  
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      );
    }
  
    return <>{children}</>;
  };  

  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        {isSidebarPage ? (
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthWrapper>
    </SessionProvider>
  );
}
