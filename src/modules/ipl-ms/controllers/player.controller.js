import ApiResponse from "../../../common/utils/api-response.js";
import * as playerService from "../services/player.service.js";

const createPlayer = async (req, res) => {
  const player = await playerService.createPlayer(req.body);
  ApiResponse.created(res, "Player created successfully", player);
};

const getAllPlayers = async (req, res) => {
  const players = await playerService.getAllPlayers(req.query);
  ApiResponse.ok(res, "Players fetched successfully", players);
};

const getTopPlayers = async (req, res, next) => {
  try {
    const { stat, limit } = req.query;

    const players = await playerService.getTopPlayers(stat, limit);
    ApiResponse.ok(res, "Players fetched successfully", players);
  } catch (error) {
    next(error);
  }
};

const getPlayerById = async (req, res) => {
  const player = await playerService.getPlayerById(req.params.id);
  ApiResponse.ok(res, "Player fetched successfully", player);
};

const getPlayersByTeam = async (req, res) => {
  const players = await playerService.getPlayersByTeam(req.query.teamId);
  ApiResponse.ok(res, "Players fetched successfully", players);
};

const transferPlayer = async (req, res) => {
  const player = await playerService.transferPlayer(req.params.id, req.body.newTeamId);
  ApiResponse.ok(res, "Player transfered successfully", player);
};

const updatePlayerRole = async (req, res) => {
  const player = await playerService.updatePlayerRole(req.params.id, req.body.role);
  ApiResponse.ok(res, "Player role updated successfully", player);
};

const updatePlayerStats = async (req, res) => {
  const player = await playerService.updatePlayerStats(req.params.id, req.body);
  ApiResponse.ok(res, "Player stats updated successfully", player);
};

const deletePlayer = async (req, res) => {
  await playerService.deletePlayer(req.params.id);
  ApiResponse.ok(res, "Player deleted successfully");
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
