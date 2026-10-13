import ResourceList from './ResourceList.jsx';
import { fetchResources as fetch } from '../api.js';

export default function Users() {
  return (
    <ResourceList
      title="Users"
      resource="users"
      endpoint="/api/users/"
      fetch={fetch}
      renderItem={(user) => (
        <>
          <h2 className="h5 card-title">{user.name ?? 'OctoFit member'}</h2>
          <p className="card-text mb-0">{user.email ?? 'Email not provided'}</p>
        </>
      )}
    />
  );
}
