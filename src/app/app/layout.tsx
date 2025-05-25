export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #E4D3FB, white, #B5F5E0)',
      backgroundAttachment: 'fixed'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("/pattern.svg")',
        opacity: 0.05,
        pointerEvents: 'none',
        backgroundRepeat: 'repeat'
      }}></div>
      <div style={{
        position: 'relative',
        margin: '0 auto',
        maxWidth: '28rem',
        padding: '1rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <main style={{
          flex: 1,
          marginTop: '1.5rem',
          paddingBottom: '2rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '28rem',
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E4D3FB',
            padding: '1.5rem 2rem'
          }}>
            {children}
          </div>
          {/* Footer is used instead of this */}
        </main>
      </div>
    </div>
  );
}
