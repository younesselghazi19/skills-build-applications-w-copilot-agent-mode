import ResourceList from './ResourceList.jsx';
import { fetchResources as fetch } from '../api.js';

function referenceName(reference) {
  if (reference && typeof reference === 'object') {
    return reference.name ?? reference.email ?? reference._id ?? 'Unknown';
  }
  return reference || 'Unknown';
}

export default function Activities() {
  return (
    <ResourceList
      title="Activities"
      resource="activities"
      endpoint="/api/activities/"
      fetch={fetch}
      renderItem={(activity) => (
        <>
          <h2 className="h5 card-title">{activity.activityType ?? 'Activity'}</h2>
          <p className="card-text mb-1">By {referenceName(activity.user)}</p>
          <p className="card-text mb-1">
            {activity.durationMinutes != null ? `${activity.durationMinutes} minutes` : 'Duration not recorded'}
          </p>
          {activity.distanceKilometers != null && (
            <p className="card-text mb-1">{activity.distanceKilometers} km</p>
          )}
          <p className="card-text fw-semibold mb-0">{activity.points ?? 0} points</p>
        </>
      )}
    />
  );
}
