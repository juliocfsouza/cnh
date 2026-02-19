import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Instructor {
  id: string;
  name: string;
  city: string;
  state: string;
  pricePerHour: number;
  bio: string;
  rating: number;
  totalReviews: number;
  categories: string[];
  createdAt: string;
}

async function getInstructor(id: string): Promise<Instructor | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  try {
    const res = await fetch(`${apiUrl}/instructors/${id}`, {
      next: { revalidate: 300 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Falha ao buscar instrutor');
    return res.json() as Promise<Instructor>;
  } catch {
    return null;
  }
}

export default async function InstructorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const instructor = await getInstructor(id);

  if (!instructor) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link
        href="/instrutores"
        style={{ color: '#1a73e8', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}
      >
        ← Voltar para instrutores
      </Link>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
            padding: '2.5rem',
            color: 'white',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              flexShrink: 0,
            }}
          >
            🧑‍🏫
          </div>
          <div>
            <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.75rem' }}>{instructor.name}</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>
              📍 {instructor.city}, {instructor.state}
            </p>
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: '2rem' }}>
          {/* Price & Rating */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: '150px',
                backgroundColor: '#e8f0fe',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1a73e8' }}>
                R$ {instructor.pricePerHour.toFixed(2)}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                por hora
              </div>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: '150px',
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#d97706' }}>
                ⭐ {instructor.rating}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {instructor.totalReviews} avaliações
              </div>
            </div>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Categorias</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {instructor.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    backgroundColor: '#e8f0fe',
                    color: '#1a73e8',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  Categoria {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          {instructor.bio && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Sobre o instrutor</h2>
              <p style={{ color: '#555', lineHeight: 1.7, margin: 0 }}>{instructor.bio}</p>
            </div>
          )}

          {/* CTA */}
          <button
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Agendar Aula
          </button>
        </div>
      </div>
    </div>
  );
}
