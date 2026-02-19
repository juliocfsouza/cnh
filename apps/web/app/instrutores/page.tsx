import Link from 'next/link';

interface Instructor {
  id: string;
  name: string;
  city: string;
  state: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  categories: string[];
}

interface ApiResponse {
  data: Instructor[];
  nextCursor: string | null;
  total: number;
}

async function getInstructors(cursor?: string): Promise<ApiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  const params = new URLSearchParams({ limit: '12' });
  if (cursor) params.set('cursor', cursor);

  try {
    const res = await fetch(`${apiUrl}/instructors?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Falha ao buscar instrutores');
    return res.json() as Promise<ApiResponse>;
  } catch {
    return { data: [], nextCursor: null, total: 0 };
  }
}

export default async function InstructoresPage({
  searchParams,
}: {
  searchParams: { cursor?: string };
}) {
  const { data: instructors, nextCursor, total } = await getInstructors(searchParams.cursor);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Instrutores de CNH</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        {total > 0 ? `${total} instrutores encontrados` : 'Nenhum instrutor encontrado'}
      </p>

      {instructors.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem',
            backgroundColor: 'white',
            borderRadius: '12px',
          }}
        >
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            Não foi possível carregar os instrutores. Tente novamente mais tarde.
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {instructors.map((instructor) => (
              <Link
                key={instructor.id}
                href={`/instrutores/${instructor.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f0fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    🧑‍🏫
                  </div>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>{instructor.name}</h3>
                  <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.9rem' }}>
                    📍 {instructor.city}, {instructor.state}
                  </p>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span style={{ color: '#1a73e8', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      R$ {instructor.pricePerHour.toFixed(2)}/h
                    </span>
                    <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>
                      ⭐ {instructor.rating} ({instructor.totalReviews})
                    </span>
                  </div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {instructor.categories.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          backgroundColor: '#e8f0fe',
                          color: '#1a73e8',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        Categoria {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}
          >
            {searchParams.cursor && (
              <Link
                href="/instrutores"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#333',
                }}
              >
                ← Início
              </Link>
            )}
            {nextCursor && (
              <Link
                href={`/instrutores?cursor=${nextCursor}`}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#1a73e8',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Próxima página →
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
