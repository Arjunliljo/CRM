import mongoose from "mongoose";
import Transaction from "../../Models/transactionModel.js";
import catchAsync from "../../Utilities/catchAsync.js";
import { matchDates, matchField } from "./matchingObj.js";

export const calculateGSTTotals = catchAsync(async (req, res, next) => {
  const query = { ...req.query };

  const matchStage = {};
  const matchingArr = ["catagory", "particular", "bank"];
  matchField(matchingArr, query, matchStage);
  matchDates(query, matchStage);

  if (query.branchId) {
    matchStage["branches.branch"] = new mongoose.Types.ObjectId(query.branchId);
  }

  const totals = await Transaction.aggregate([
    { $match: matchStage },
    {
      $addFields: {
        // Ensure numeric conversion
        gstPercentNumeric: { $toDouble: "$gstPercent" },
        totalAmtNumeric: { $toDouble: "$totalAmt" },

        // Calculate GST based on gstType
        calculatedGST: {
          $cond: [
            { $eq: ["$gstType", "excl"] },
            {
              $multiply: [
                { $toDouble: "$totalAmt" },
                { $divide: [{ $toDouble: "$gstPercent" }, 100] },
              ],
            },
            {
              $cond: [
                { $eq: ["$gstType", "incl"] },
                {
                  $multiply: [
                    { $toDouble: "$totalAmt" },
                    {
                      $divide: [
                        { $toDouble: "$gstPercent" },
                        { $add: [100, { $toDouble: "$gstPercent" }] },
                      ],
                    },
                  ],
                },
                0,
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalInGst: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "Credit"] },
                  { $ne: ["$isGstDeduct", true] },
                ],
              },
              "$calculatedGST",
              0,
            ],
          },
        },
        totalOutGst: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "Debit"] },
                  { $ne: ["$isGstDeduct", true] },
                ],
              },
              "$calculatedGST",
              0,
            ],
          },
        },
        totalCredit: {
          $sum: {
            $cond: [
              { $eq: ["$type", "Credit"] },
              { $toDouble: "$totalAmt" },
              0,
            ],
          },
        },
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "Debit"] }, { $toDouble: "$totalAmt" }, 0],
          },
        },
      },
    },
  ]);

  // Initialize default results
  const results = {
    totalCredit: 0,
    totalInPercent: 0,
    totalDebit: 0,
    totalOutPercent: 0,
  };

  // Check if aggregation returned results
  if (totals.length > 0) {
    const totalData = totals[0];

    // Assign values from aggregation results
    results.totalCredit = totalData.totalCredit || 0;
    results.totalDebit = totalData.totalDebit || 0;
    results.totalInPercent = totalData.totalInGst || 0;
    results.totalOutPercent = totalData.totalOutGst || 0;
    results.totalOut = totalData.totalInGst || 0;
    results.totalIn = totalData.totalOutGst || 0;
  }

  // Send response
  res.status(200).json({
    message: "Successfully fetched",
    status: "Success",
    results,
  });
});
