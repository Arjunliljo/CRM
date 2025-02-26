import ActivityLog from "../../Models/activityLog/activityLogModel.js";
import { deleteOne, getAll, getOne, updateOne } from "../handlerFactory.js";

const getAllActivityLogs = getAll(ActivityLog);
const getActivityLog = getOne(ActivityLog);
const updateActivityLog = updateOne(ActivityLog);
const deleteActivityLog = deleteOne(ActivityLog);

// const updateRemark = async (req, res) => {
//   const { logId, remark } = req.body;
//   const updatedLog = await ActivityLog.findByIdAndUpdate(logId, { remark }, { new: true });
//   res.status(200).json(updatedLog);
// };

export {
  getAllActivityLogs,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
};
