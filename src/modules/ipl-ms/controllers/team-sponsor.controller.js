import ApiResponse from "../../../common/utils/api-response.js";
import * as teamSponsorService from "../services/team-sponsor.service.js";

const attachSponsor = async (req, res) => {
  const teamSponsor = await teamSponsorService.attachSponsor(req.body);
  ApiResponse.created(res, "Sponsor attached to team successfully", teamSponsor);
};

const detachSponsor = async (req, res) => {
  const teamSponsor = await teamSponsorService.detachSponsor(req.body);
  ApiResponse.ok(res, "Sponsor detached from team successfully", teamSponsor);
};

export { attachSponsor, detachSponsor };
