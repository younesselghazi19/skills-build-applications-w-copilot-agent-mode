import mongoose from 'mongoose';
import ActivityModel from '../models/Activity';
import LeaderboardModel from '../models/Leaderboard';
import TeamModel from '../models/Team';
import UserModel from '../models/User';
import WorkoutModel from '../models/Workout';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const user = UserModel;
const team = TeamModel;
const activity = ActivityModel;
const leaderboard = LeaderboardModel;
const workout = WorkoutModel;

const objectId = (value: string) => new mongoose.Types.ObjectId(value);
const ids = {
  users: [
    objectId('650000000000000000000001'),
    objectId('650000000000000000000002'),
    objectId('650000000000000000000003'),
    objectId('650000000000000000000004'),
  ],
  teams: [
    objectId('650000000000000000000011'),
    objectId('650000000000000000000012'),
  ],
  activities: [
    objectId('650000000000000000000021'),
    objectId('650000000000000000000022'),
    objectId('650000000000000000000023'),
    objectId('650000000000000000000024'),
    objectId('650000000000000000000025'),
    objectId('650000000000000000000026'),
  ],
  leaderboard: [
    objectId('650000000000000000000031'),
    objectId('650000000000000000000032'),
    objectId('650000000000000000000033'),
    objectId('650000000000000000000034'),
  ],
  workouts: [
    objectId('650000000000000000000041'),
    objectId('650000000000000000000042'),
    objectId('650000000000000000000043'),
    objectId('650000000000000000000044'),
    objectId('650000000000000000000045'),
  ],
};

/**
 * Seed the octofit_db database with test data.
 * Run with `npm run seed --prefix octofit-tracker/backend`.
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const completedAt = new Date();
    const recentDate = (daysAgo: number) =>
      new Date(completedAt.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    const users = [
      { _id: ids.users[0], name: 'Alex Rivera', email: 'alex.rivera@example.com' },
      { _id: ids.users[1], name: 'Jordan Lee', email: 'jordan.lee@example.com' },
      { _id: ids.users[2], name: 'Sam Patel', email: 'sam.patel@example.com' },
      { _id: ids.users[3], name: 'Taylor Kim', email: 'taylor.kim@example.com' },
    ];
    const teams = [
      { _id: ids.teams[0], name: 'Morning Movers', members: [ids.users[0], ids.users[1]], points: 285 },
      { _id: ids.teams[1], name: 'Trail Blazers', members: [ids.users[2], ids.users[3]], points: 240 },
    ];
    const activities = [
      { _id: ids.activities[0], user: ids.users[0], activityType: 'Running', durationMinutes: 32, distanceKilometers: 5.2, points: 55, completedAt: recentDate(1) },
      { _id: ids.activities[1], user: ids.users[1], activityType: 'Cycling', durationMinutes: 45, distanceKilometers: 14, points: 70, completedAt: recentDate(1) },
      { _id: ids.activities[2], user: ids.users[2], activityType: 'Hiking', durationMinutes: 60, distanceKilometers: 6.5, points: 80, completedAt: recentDate(2) },
      { _id: ids.activities[3], user: ids.users[3], activityType: 'Yoga', durationMinutes: 40, points: 40, completedAt: recentDate(2) },
      { _id: ids.activities[4], user: ids.users[0], activityType: 'Strength training', durationMinutes: 35, points: 65, completedAt: recentDate(3) },
      { _id: ids.activities[5], user: ids.users[2], activityType: 'Running', durationMinutes: 28, distanceKilometers: 4.6, points: 50, completedAt: recentDate(4) },
    ];
    const leaderboardEntries = [
      { _id: ids.leaderboard[0], user: ids.users[0], score: 520, period: 'all-time' },
      { _id: ids.leaderboard[1], user: ids.users[1], score: 465, period: 'all-time' },
      { _id: ids.leaderboard[2], user: ids.users[2], score: 440, period: 'all-time' },
      { _id: ids.leaderboard[3], user: ids.users[3], score: 390, period: 'all-time' },
    ];
    const workouts = [
      { _id: ids.workouts[0], name: 'Easy 5K Run', description: 'A steady-paced outdoor run to build aerobic endurance.', activityType: 'Running', durationMinutes: 35, difficulty: 'beginner' },
      { _id: ids.workouts[1], name: 'Tempo Ride', description: 'A sustained moderate-effort ride with a short warm-up and cool-down.', activityType: 'Cycling', durationMinutes: 45, difficulty: 'intermediate' },
      { _id: ids.workouts[2], name: 'Full Body Basics', description: 'A balanced bodyweight strength circuit with controlled repetitions.', activityType: 'Strength training', durationMinutes: 30, difficulty: 'beginner' },
      { _id: ids.workouts[3], name: 'Recovery Flow', description: 'Gentle mobility and stretching for a recovery day.', activityType: 'Yoga', durationMinutes: 25, difficulty: 'beginner' },
      { _id: ids.workouts[4], name: 'Hill Intervals', description: 'Short uphill efforts with easy recovery between repetitions.', activityType: 'Running', durationMinutes: 40, difficulty: 'advanced' },
    ];

    await user.deleteMany({ _id: { $in: ids.users } });
    await user.insertMany(users);
    await team.deleteMany({ _id: { $in: ids.teams } });
    await team.insertMany(teams);
    await activity.deleteMany({ _id: { $in: ids.activities } });
    await activity.insertMany(activities);
    await leaderboard.deleteMany({ _id: { $in: ids.leaderboard } });
    await leaderboard.insertMany(leaderboardEntries);
    await workout.deleteMany({ _id: { $in: ids.workouts } });
    await workout.insertMany(workouts);

    const seededCounts = await Promise.all([
      user.countDocuments({ _id: { $in: ids.users } }),
      team.countDocuments({ _id: { $in: ids.teams } }),
      activity.countDocuments({ _id: { $in: ids.activities } }),
      leaderboard.countDocuments({ _id: { $in: ids.leaderboard } }),
      workout.countDocuments({ _id: { $in: ids.workouts } }),
    ]);
    console.log('Seeded records:', {
      users: seededCounts[0],
      teams: seededCounts[1],
      activities: seededCounts[2],
      leaderboard: seededCounts[3],
      workouts: seededCounts[4],
    });
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase().catch((error: unknown) => {
  console.error('Error closing the database connection:', error);
  process.exitCode = 1;
});
