import Team from "../models/team.model.js";
import Player from "../models/player.model.js";
import ApiError from "../../../common/utils/api-error.js";

const createPlayer = async ({ name, role, teamId }) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw ApiError.notFound("Team not found");
  }

  const player = await Player.create({
    name,
    role: role.toLowerCase().trim(),
    teamId,
  });
  return player;
};

const getAllPlayers = async (query = {}) => {
  const { page = 1, limit = 10 } = query;

  const lim = Math.min(Number(limit) || 10, 50);
  const skip = (Number(page) - 1) * lim;

  const players = await Player.find()
    .skip(skip)
    .limit(lim)
    .populate("teamId", "name");

  const total = await Player.countDocuments();

  return {
    players,
    pagination: {
      total,
      page: Number(page),
      limit: lim,
      totalPages: Math.ceil(total / lim),
    },
  };
};

const getTopPlayers = async (stat, limit = 10) => {
  const allowedStats = [
    "matchesPlayed",
    "totalRuns",
    "totalSixes",
    "totalFours",
    "totalWickets",
    "totalCatches",
  ];

  if (!allowedStats.includes(stat)) {
    throw ApiError.badRequest(
      "Invalid stat type, It should be from matchesPlayed, totalRuns, totalSixes, totalFours, totalWickets, totalCatches",
    );
  }

  const lim = Math.min(Number(limit) || 10, 50);

  const players = await Player.find()
    .sort({ [stat]: -1 })
    .limit(lim)
    .populate("teamId", "name");

  return players;
};

const getPlayerById = async (playerId) => {
  const player = await Player.findById(playerId).populate("teamId", "name");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};

const getPlayersByTeam = async (teamId) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw ApiError.notFound("Team not found");
  }

  const players = await Player.find({ teamId }).populate("teamId", "name");

  if (players.length === 0) {
    throw ApiError.notFound("Players not found");
  }

  return players;
};

const transferPlayer = async (playerId, newTeamId) => {
  const team = await Team.findById(newTeamId);

  if (!team) {
    throw ApiError.notFound("Team not found");
  }

  const player = await Player.findByIdAndUpdate(
    playerId,
    { teamId: newTeamId },
    { new: true, runValidators: true },
  ).populate("teamId", "name");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};

const updatePlayerRole = async (playerId, role) => {
  const player = await Player.findByIdAndUpdate(
    playerId,
    { role },
    { new: true, runValidators: true },
  ).populate("teamId", "name");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};

const updatePlayerStats = async (playerId, updateData) => {
  const allowedFields = [
    "matchesPlayed",
    "totalRuns",
    "totalSixes",
    "totalFours",
    "totalWickets",
    "totalCatches",
  ];

  for (const key of Object.keys(updateData)) {
    if (!allowedFields.includes(key)) {
      throw ApiError.badRequest("Invalid stats field");
    }
  }

  const player = await Player.findByIdAndUpdate(
    playerId,
    { $inc: updateData },
    { new: true, runValidators: true },
  ).populate("teamId", "name");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};

const deletePlayer = async (playerId) => {
  const player = await Player.findByIdAndDelete(playerId);

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};

export {
  createPlayer,
  getAllPlayers,
  getTopPlayers,
  getPlayerById,
  getPlayersByTeam,
  transferPlayer,
  updatePlayerRole,
  updatePlayerStats,
  deletePlayer,
};
