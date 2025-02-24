import Lead from "../../Models/leadsModel.js";
import Role from "../../Models/roleModel.js";
import mongoose from "mongoose";
import User from "../../Models/userModel.js";

export const assignLeadsToUsers = async (leadIds, user) => {
  try {
    const leadObjectIds = leadIds.map((id) =>
      mongoose.Types.ObjectId.createFromHexString(id)
    );
    const userObjectId = mongoose.Types.ObjectId.createFromHexString(user._id);
    const userRoleObjectId = mongoose.Types.ObjectId.createFromHexString(
      user.role
    );

    const userRole = await Role.findById(userRoleObjectId);
    if (!userRole) {
      throw new Error(`Role not found for user: ${user._id}`);
    }

    const result = await Lead.aggregate([
      {
        $match: {
          _id: { $in: leadObjectIds },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "existingUsers",
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "existingUsers.role",
          foreignField: "_id",
          as: "userRoles",
        },
      },
      {
        $addFields: {
          isUserAssigned: {
            $in: [userObjectId, "$users"],
          },
          // Identify users with the same role
          usersWithSameRole: {
            $filter: {
              input: "$existingUsers",
              as: "existingUser",
              cond: {
                $eq: ["$$existingUser.role", userRoleObjectId],
              },
            },
          },
          // Identify users with different roles
          usersWithDifferentRoles: {
            $filter: {
              input: "$users",
              as: "userId",
              cond: {
                $not: {
                  $in: [
                    "$$userId",
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: "$existingUsers",
                            as: "eu",
                            cond: { $eq: ["$$eu.role", userRoleObjectId] },
                          },
                        },
                        as: "filteredUser",
                        in: "$$filteredUser._id",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          updateRequired: {
            $cond: {
              if: { $eq: ["$isUserAssigned", true] },
              then: false,
              else: true,
            },
          },
          newUsers: {
            $cond: {
              if: { $eq: ["$isUserAssigned", true] },
              then: "$users",
              else: {
                $concatArrays: [
                  "$usersWithDifferentRoles", // Keep users with different roles
                  [userObjectId], // Add the new user
                ],
              },
            },
          },
          newAssignedCount: {
            $cond: {
              if: { $gt: [{ $size: "$usersWithSameRole" }, 0] },
              then: { $add: [{ $ifNull: ["$assigned", 0] }, 1] },
              else: { $ifNull: ["$assigned", 0] },
            },
          },
        },
      },
    ]);

    const bulkOps = result
      .map((doc) => {
        if (!doc.updateRequired) return null;

        return {
          updateOne: {
            filter: { _id: doc._id },
            update: {
              $set: {
                users: doc.newUsers,
                assigned: doc.newAssignedCount,
              },
            },
          },
        };
      })
      .filter((op) => op !== null);

    if (bulkOps.length > 0) {
      await Lead.bulkWrite(bulkOps);
    }

    return result;
  } catch (error) {
    console.error("Error in assignLeadsToUsers:", error);
    throw error;
  }
};

// export const assignLeadsToUsers = async (leadIds, user) => {
//   try {
//     for (const leadId of leadIds) {
//       // Find the lead
//       const lead = await Lead.findById(leadId);
//       if (!lead) {
//         throw new Error(`Lead not found with ID: ${leadId}`);
//       }

//       // Find the role of the user
//       const role = await Role.findById(user.role);
//       if (!role) {
//         throw new Error(`Role not found for user: ${user._id}`);
//       }

//       // Check if user is already assigned to this lead
//       const isUserAlreadyAssigned = lead.users.some(
//         (existingUserId) => existingUserId.toString() === user._id.toString()
//       );

//       if (isUserAlreadyAssigned) {
//         console.log(`User ${user._id} is already assigned to lead ${leadId}`);
//         continue;
//       }

//       if (lead.users.length > 0) {
//         // Use Promise.all to handle async operations properly
//         const existingUsers = await Promise.all(
//           lead.users.map(async (existingUserId) => {
//             const existingUserObj = await User.findById(existingUserId);
//             if (!existingUserObj) return null;

//             const existingUserRole = await Role.findById(existingUserObj.role);
//             return {
//               userId: existingUserId,
//               roleName: existingUserRole?.name,
//             };
//           })
//         );

//         // Filter out null values and users with the same role
//         lead.users = lead.users.filter((existingUserId) => {
//           const matchingUser = existingUsers.find(
//             (u) => u?.userId.toString() === existingUserId.toString()
//           );
//           return matchingUser && matchingUser.roleName !== role.name;
//         });

//         // Increment assigned count if we removed any users
//         const removedUsers = existingUsers.filter(
//           (u) => u?.roleName === role.name
//         );
//         if (removedUsers.length > 0) {
//           lead.assigned = (lead.assigned || 0) + 1;
//         }
//       }

//       // Add new user
//       lead.users.push(user._id);

//       // Save the updated lead
//       await lead.save();
//     }
//   } catch (error) {
//     console.error("Error in assignLeadsToUsers:", error);
//     throw error;
//   }
// };
