import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CNH Marketplace - Encontre seu Instrutor de CNH',
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
          color: 'white',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Encontre o melhor instrutor de CNH perto de você
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
          Compare preços, avaliações e agende sua aula de forma rápida e fácil.
        </p>
        <Link
          href="/instrutores"
          style={{
            backgroundColor: 'white',
            color: '#1a73e8',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Ver Instrutores
        </Link>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>
          Por que usar o CNH Marketplace?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {[
            {
              icon: '🔍',
              title: 'Busca Fácil',
              desc: 'Encontre instrutores certificados na sua cidade em segundos.',
            },
            {
              icon: '⭐',
              title: 'Avaliações Reais',
              desc: 'Leia avaliações de outros alunos antes de escolher seu instrutor.',
            },
            {
              icon: '💰',
              title: 'Melhores Preços',
              desc: 'Compare valores e escolha o que cabe no seu bolso.',
            },
            {
              icon: '📅',
              title: 'Agendamento Online',
              desc: 'Agende sua aula diretamente pela plataforma, sem complicação.',
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: '#e8f0fe',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
          Pronto para tirar sua CNH?
        </h2>
        <p style={{ color: '#555', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Mais de 500 instrutores credenciados em todo o Brasil aguardam por você.
        </p>
        <Link
          href="/instrutores"
          style={{
            backgroundColor: '#1a73e8',
            color: 'white',
            padding: '0.875rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Começar Agora
        </Link>
      </section>
    </div>
  );
}
