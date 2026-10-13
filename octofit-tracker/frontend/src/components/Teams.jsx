import ResourceList from './ResourceList.jsx';

export default function Teams() {
  return (
    <ResourceList
      title="Teams"
      resource="teams"
      renderItem={(team) => (
        <>
          <h2 className="h5 card-title">{team.name ?? 'Team'}</h2>
          <p className="card-text mb-1">{Array.isArray(team.members) ? team.members.length : 0} members</p>
          <p className="card-text fw-semibold mb-0">{team.points ?? 0} points</p>
        </>
      )}
    />
  );
}
