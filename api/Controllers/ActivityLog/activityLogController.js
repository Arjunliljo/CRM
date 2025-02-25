import ActivityLog from "../../Models/activityLog/activityLogModel.js";
import { deleteOne, getAll, getOne, updateOne } from "../handlerFactory.js";

const getAllActivityLogs = getAll(ActivityLog);
const getActivityLog = getOne(ActivityLog);
const updateActivityLog = updateOne(ActivityLog);
const deleteActivityLog = deleteOne(ActivityLog);

export {
  getAllActivityLogs,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
};
