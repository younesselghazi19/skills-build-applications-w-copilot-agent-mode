import ResourceList from './ResourceList.jsx';

export default function Workouts() {
  return (
    <ResourceList
      title="Workouts"
      resource="workouts"
      renderItem={(workout) => (
        <>
          <h2 className="h5 card-title">{workout.name ?? 'Workout'}</h2>
          <p className="card-text">{workout.description ?? 'No description available.'}</p>
          <p className="card-text mb-1">
            {workout.activityType ?? 'Fitness'} - {workout.durationMinutes ?? 'Flexible'} minutes
          </p>
          <span className="badge text-bg-success text-capitalize">
            {workout.difficulty ?? 'beginner'}
          </span>
        </>
      )}
    />
  );
}
