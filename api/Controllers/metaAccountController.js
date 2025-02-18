import MetaAccount from "../Models/metaAccountModel.js";
import catchAsync from "../Utilities/catchAsync.js";

import { deleteOne, getAll, updateOne } from "./handlerFactory.js";
import { getLongLivedAccessToken } from "./Meta/getLongLivedToken.js";

const getMetaAccounts = getAll(MetaAccount);

const createMetaAccount = catchAsync(async (req, res) => {
  const account = await getLongLivedAccessToken(req.body);
  const metaAccount = await MetaAccount.create(account);

  res.status(201).json({
    metaAccount,
    message: "Meta account created successfully",
  });
});

const updateMetaAccount = updateOne(MetaAccount);
const deleteMetaAccount = deleteOne(MetaAccount);

export {
  createMetaAccount,
  getMetaAccounts,
  updateMetaAccount,
  deleteMetaAccount,
};
