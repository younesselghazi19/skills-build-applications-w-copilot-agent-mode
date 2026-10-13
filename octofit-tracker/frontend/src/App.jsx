import { Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3">
        <img className="brand-logo" src="/octofitapp-small.png" alt="OctoFit Tracker" />
        <div>
          <h1>OctoFit Tracker</h1>
          <p className="lead mb-0">Your activity and team fitness tracker.</p>
        </div>
      </header>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}