import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js";
import Owner from "../models/owner.model.js"

const createTeam = async ({ data, user }) => {
    const owner = await Owner.findOne({ userId: user._id });

    if (!owner) {
        throw ApiError.notFound("Owner not found for this user");
    }

    const team = await Team.create({ name: data.name, ownerId: owner._id });
    return team;
};

const getAllTeams = async () => {
    const teams = await Team.find().populate("ownerId")
    return teams
}

const getTeamById = async (id) => {
    const team = await Team.findById(id).populate("ownerId")

    if(!team) {
        throw ApiError.notFound("Team not found")
    }

    return team;
}

const getAllTeamsByOwnerId = async (userId) => {
    const owner = await Owner.findOne({ userId });

    if (!owner) {
        throw ApiError.notFound("Owner not found for this user");
    }

    const teams = await Team.find({ownerId: owner._id}).populate("ownerId")

    if(teams.length === 0) {
        throw ApiError.notFound("No teams found for this owner")
    }

    return teams;
}

const updateTeam = async (id, data) => { 

    const team = await Team.findByIdAndUpdate(
        id,
        {name: data.name},
        {new: true, runValidators: true}
    )

    if(!team) {
        throw ApiError.notFound("Team not found")
    }

    return team;
}

const deleteTeam = async (id) => {
    const team =  await Team.findByIdAndDelete(id)

    if(!team) {
        throw ApiError.notFound("Team not found")
    }

    return team;
}

export { createTeam, getAllTeams, getTeamById, getAllTeamsByOwnerId, updateTeam, deleteTeam };
