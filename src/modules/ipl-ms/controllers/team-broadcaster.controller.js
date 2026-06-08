import ApiResponse from "../../../common/utils/api-response.js";
import * as teamBroadcasterService from "../services/team-broadcaster.service.js";

const attachBroadcaster = async (req, res) => {
    const teamBroadcaster = await teamBroadcasterService.attachBroadcaster(req.body)
    ApiResponse.created(res, "Broadcaster attached to team successfully", teamBroadcaster);
};

const detachBroadcaster = async (req, res) => {
    const teamBroadcaster = await teamBroadcasterService.detachBroadcaster(req.body)
    ApiResponse.ok(res, "Broadcaster detached from team successfully", teamBroadcaster);
};

export { attachBroadcaster, detachBroadcaster };
