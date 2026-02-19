import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CNH Marketplace - Encontre seu Instrutor',
  description:
    'Marketplace para encontrar instrutores de CNH na sua cidade. Compare preços, avaliações e agende sua aula.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#f5f5f5',
          color: '#333',
        }}
      >
        <header
          style={{
            backgroundColor: '#1a73e8',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.25rem' }}>
            🚗 CNH Marketplace
          </a>
          <nav style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Início
            </a>
            <a href="/instrutores" style={{ color: 'white', textDecoration: 'none' }}>
              Instrutores
            </a>
          </nav>
        </header>
        <main>{children}</main>
        <footer
          style={{
            textAlign: 'center',
            padding: '2rem',
            marginTop: '3rem',
            borderTop: '1px solid #ddd',
            color: '#666',
            fontSize: '0.875rem',
          }}
        >
          © {new Date().getFullYear()} CNH Marketplace. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
