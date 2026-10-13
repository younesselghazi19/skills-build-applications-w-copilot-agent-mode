import { useEffect, useState } from 'react';
import { fetchResources } from '../api.js';

export default function ResourceList({ title, resource, renderItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetchResources(resource, controller.signal)
      .then(setItems)
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [resource]);

  return (
    <main className="container py-5">
      <header className="page-heading mb-4">
        <p className="text-uppercase fw-semibold mb-1">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold mb-0">{title}</h1>
      </header>
      {loading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {!loading && error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <p className="alert alert-light border mb-0">No {title.toLowerCase()} to display yet.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((item, index) => {
            const key = item?._id ?? item?.id ?? `${resource}-${index}`;
            return (
              <div className="col-md-6 col-xl-4" key={key}>
                <article className="resource-card card h-100">
                  <div className="card-body">{renderItem(item)}</div>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
