export default function Loading() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full govuk-!-margin-top-6" style={{ textAlign: 'center', padding: '40px 0' }}>
        <p className="govuk-body" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Loading...</p>
        <p className="govuk-body-s" style={{ color: '#505a5f' }}>Fetching product information</p>
      </div>
    </div>
  );
}
