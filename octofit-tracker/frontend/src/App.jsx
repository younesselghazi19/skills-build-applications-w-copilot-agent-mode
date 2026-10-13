import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function Home() {
  return (
    <main className="container py-5">
      <header className="home-header rounded-4 p-4 p-md-5">
        <img className="brand-logo" src="/octofitapp-small.png" alt="" />
        <div>
          <p className="text-uppercase fw-semibold mb-2">Move together</p>
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="lead mb-0">Track your progress, find your team, and keep moving.</p>
        </div>
      </header>
      <section className="mt-5">
        <h2 className="h4 mb-3">Explore OctoFit</h2>
        <div className="row g-3">
          {[
            ['Activities', '/activities', 'See recent fitness activity.'],
            ['Leaderboard', '/leaderboard', "Celebrate everybody's progress."],
            ['Teams', '/teams', 'Find your fitness community.'],
            ['Users', '/users', 'Meet the OctoFit community.'],
            ['Workouts', '/workouts', 'Discover your next workout.'],
          ].map(([title, path, description]) => (
            <div className="col-sm-6 col-lg-4" key={path}>
              <NavLink className="explore-card card h-100 text-decoration-none" to={path}>
                <div className="card-body">
                  <h3 className="h5 card-title">{title}</h3>
                  <p className="card-text mb-0">{description}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">OctoFit Tracker</NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-1">
            {[
              ['Activities', '/activities'],
              ['Leaderboard', '/leaderboard'],
              ['Teams', '/teams'],
              ['Users', '/users'],
              ['Workouts', '/workouts'],
            ].map(([label, path]) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="container py-4 text-center small text-secondary">
        OctoFit Tracker - Build healthy habits together
      </footer>
    </>
  );
}