import * as ownerService from "../services/owner.service.js"
import ApiResponse from "../../../common/utils/api-response.js"

const createOwner = async (req, res) => {
    const owner = await ownerService.createOwner(req.body)
    ApiResponse.created(res, "Owner Created successfully", owner)
}

const getAllOwner = async (req, res) => {
    const owners = await ownerService.getAllOwner()
    ApiResponse.ok(res, "Owner fetched successfully", owners)
}

const getOwnerById = async (req, res) => {
    const owner = await ownerService.getOwnerById(req.params.id)
    ApiResponse.ok(res, "Owner fetched successfully", owner)
}

const updateOwner = async (req, res) => {
    const updatedOwner = await ownerService.updateOwner(req.params.id, req.body)
    ApiResponse.ok(res, "owner updated successfully", updatedOwner);
}

const deleteOwner = async (req, res) => {
    await ownerService.deleteOwner(req.params.id)
    ApiResponse.ok(res, "owner deleted successfully");
}

export { createOwner, getAllOwner, getOwnerById, updateOwner, deleteOwner }