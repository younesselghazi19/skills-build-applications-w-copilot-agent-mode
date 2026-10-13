import { model, Schema } from 'mongoose';

const LeaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0, min: 0 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
});

export default model('Leaderboard', LeaderboardSchema);
