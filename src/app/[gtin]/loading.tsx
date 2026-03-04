export default function Loading() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full" style={{ textAlign: 'center', padding: '60px 0' }}>
        <div className="govuk-!-margin-bottom-6" style={{ display: 'inline-block' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '5px solid #b1b4b6',
            borderTopColor: '#1d70b8',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        </div>
        <h1 className="govuk-heading-l">Loading</h1>
        <p className="govuk-body">Fetching product information</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
