import ApiError from "../../../common/utils/api-error.js";
import Broadcaster from "../models/broadcaster.model.js";

const createBroadcaster = async ({ name }) => {
  const broadcaster = await Broadcaster.create({ name });
  return broadcaster;
};

const getAllBroadcasters = async (query = {}) => {
  const { page = 1, limit = 10, search = "" } = query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // filter
  const filter = search ? { name: { $regex: search, $options: "i" } } : {};

  const broadcasters = await Broadcaster.find(filter)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });

  const total = await Broadcaster.countDocuments(filter);

  return {
    data: broadcasters,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getBroadcasterById = async (id) => {
  const broadcaster = await Broadcaster.findById(id);

  if (!broadcaster) {
    throw ApiError.notFound("Broadcaster not found");
  }

  return broadcaster;
};

const updateBroadcaster = async (id, { name }) => {
  const broadcaster = await Broadcaster.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true },
  );

  if (!broadcaster) {
    throw ApiError.notFound("Broadcaster not found");
  }

  return broadcaster;
};

const deleteBroadcaster = async (id) => {
  const broadcaster = await Broadcaster.findByIdAndDelete(id);

  if (!broadcaster) {
    throw ApiError.notFound("Broadcaster not found");
  }

  return broadcaster;
};

export {
  createBroadcaster,
  getAllBroadcasters,
  getBroadcasterById,
  updateBroadcaster,
  deleteBroadcaster,
};
