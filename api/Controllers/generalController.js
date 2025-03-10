import General from "../Models/generalModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const createGeneral = createOne(General);
export const updateGeneral = updateOne(General);
export const deleteGeneral = deleteOne(General);
export const getGeneral = getOne(General);
export const getAllGenerals = getAll(General);

export const autoAssignLeadsToBranch = catchAsync(async (req, res, next) => {
  const { autoAssignLeadsToBranch } = req.body;

  const generals = await General.find();
  if (!generals) {
    return res.status(404).json({
      message: "No generals found",
    });
  }

  const general = await General.findByIdAndUpdate(
    generals[0]._id,
    {
      autoAssignLeadsToBranch,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Auto assign leads to branch updated",
    general,
  });
});
