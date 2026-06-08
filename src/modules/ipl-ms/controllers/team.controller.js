import * as teamService from "../services/team.service.js"
import ApiResponse from "../../../common/utils/api-response.js"

const createTeam = async (req, res) => {
    const team = await teamService.createTeam({
        data: req.body,
        user: req.user
    })
    ApiResponse.created(res, "Team created successfully", team)
}

const getAllTeams = async (req, res) => {
    const teams = await teamService.getAllTeams()
    ApiResponse.ok(res, "Teams fetched successfully", teams)
}

const getTeamById = async (req, res) => {
    const team = await teamService.getTeamById(req.params.id)
    ApiResponse.ok(res, "Team fetched successfully", team)
}

const getAllTeamsByOwnerId = async (req, res) => {
    const teams = await teamService.getAllTeamsByOwnerId(req.user._id)
    ApiResponse.ok(res, "Teams fetched successfully", teams)
}

const updateTeam = async (req, res) => {
    const team = await teamService.updateTeam(req.params.id, req.body)
    ApiResponse.ok(res, "Team updated successfully", team)
}

const deleteTeam = async (req, res) => {
    await teamService.deleteTeam(req.params.id)
    ApiResponse.ok(res, "Team deleted successfully")
}

export { createTeam, getAllTeams, getTeamById, getAllTeamsByOwnerId, updateTeam, deleteTeam}