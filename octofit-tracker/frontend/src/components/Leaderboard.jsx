import ResourceList from './ResourceList.jsx';

function referenceName(reference) {
  if (reference && typeof reference === 'object') {
    return reference.name ?? reference._id ?? 'Unknown';
  }
  return reference || 'Unknown';
}

export default function Leaderboard() {
  return (
    <ResourceList
      title="Leaderboard"
      resource="leaderboard"
      renderItem={(entry) => (
        <>
          <h2 className="h5 card-title">{referenceName(entry.user)}</h2>
          <p className="card-text mb-1">Team: {referenceName(entry.team)}</p>
          <p className="card-text fw-semibold mb-0">{entry.score ?? 0} points - {entry.period ?? 'all-time'}</p>
        </>
      )}
    />
  );
}
