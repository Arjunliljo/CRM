class APIFeatures {
  constructor(model, query, queryStr) {
    this.model = model;
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };

    const excludedFields = [
      "page",
      "sort",
      "limit",
      "field",
      "branchId",
      "startDate",
      "endDate",
      "search",
      "user",
      "role",
      "country",
    ];

    excludedFields.forEach((el) => delete queryObj[el]);

    // Process each query parameter for comma-separated values
    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "string" && queryObj[key].includes(",")) {
        queryObj[key] = {
          $in: queryObj[key].split(",").map((item) => item.trim()),
        };
      }
    });

    this.query = this.query.find(queryObj);

    return this;
  }
  search() {
    if (this.queryStr.search === "") return this;
    if (
      this.queryStr.search &&
      typeof this.queryStr.search === "string" &&
      this.queryStr.search.trim() !== ""
    ) {
      const escapedSearch = this.queryStr.search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const searchRegex = new RegExp(this.queryStr.search, "i");
      const searchQuery = {
        $or: [
          { formattedDate: { $regex: searchRegex } },
          { property: { $regex: searchRegex } },
          { item: { $regex: searchRegex } },
          { purchasedBy: { $regex: searchRegex } },
          { invested: { $regex: searchRegex } },
          { tds: { $regex: searchRegex } },
          { tdsType: { $regex: searchRegex } },
          { purpose: { $regex: searchRegex } },
          { remark: { $regex: searchRegex } },
          { type: { $regex: searchRegex } },
          { agent: { $regex: searchRegex } },
          { counsillor: { $regex: searchRegex } },
          { currency: { $regex: searchRegex } },
          { student: { $regex: searchRegex } },
          { intakeMonth: { $regex: searchRegex } },
          { country: { $regex: searchRegex } },
          { property: { $regex: searchRegex } },
          {
            status: {
              $regex: `^${escapedSearch.substring(0, 4)}`,
              $options: "i",
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$amount" },
                regex: this.queryStr.search,
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$receivable" },
                regex: this.queryStr.search,
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$courseFee" },
                regex: this.queryStr.search,
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$inr" },
                regex: this.queryStr.search,
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$commition" },
                regex: this.queryStr.search,
                options: "i",
              },
            },
          },
        ],
      };
      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortingItems = this.queryStr.sort.split("%").join(" ");
      this.query = this.query.sort(sortingItems);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  userFilter() {
    if (this.queryStr.user) {
      // Handle both single user ID and comma-separated user IDs
      const userIds = this.queryStr.user.split(",").map((id) => id.trim());

      // Filter documents where the users array contains any of the specified user IDs
      this.query = this.query.find({
        users: {
          $in: userIds,
        },
      });
    }
    return this;
  }
  countryFilter() {
    if (this.queryStr.country) {
      // Handle both single user ID and comma-separated user IDs
      const countryIds = this.queryStr.country
        .split(",")
        .map((id) => id.trim());

      // Filter documents where the users array contains any of the specified user IDs
      this.query = this.query.find({
        countries: {
          $in: countryIds,
        },
      });
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.field) {
      const fields = this.queryStr.field.split("%").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate(count) {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 32;
    const skip = (page - 1) * limit;

    if (this.queryStr.page) {
      if (count <= skip) throw new Error("Page does not exist");
    }
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  gstType() {
    const gstType = this.queryStr.gstType;

    if (!gstType) return this;

    if (gstType === "no-gst") {
      this.query.find({ gstType: "no-gst" });
    } else if (gstType === "gst") {
      this.query.find({ gstType: { $ne: "no-gst" } });
    }

    return this;
  }

  filterByBranch() {
    if (this.queryStr.branchId) {
      const branchId = this.queryStr.branchId;

      this.query = this.query.find({
        "branches.branch": branchId,
      });
    }
    return this;
  }

  filterByDateRange() {
    if (this.queryStr.startDate || this.queryStr.endDate) {
      let dateFilter = {};

      // Convert strings to Date objects for proper MongoDB comparison
      if (this.queryStr.startDate) {
        // Set the time to the start of the day
        const startDate = new Date(this.queryStr.startDate);
        startDate.setHours(0, 0, 0, 0);
        dateFilter.$gte = startDate;
      }

      if (this.queryStr.endDate) {
        // Set the time to the end of the day
        let endDate = new Date(this.queryStr.endDate);
        endDate.setHours(23, 59, 59, 999);
        dateFilter.$lte = endDate;
      }

      // Apply the date range filter to the query
      this.query = this.query.find({
        date: dateFilter,
      });
    }

    return this;
  }

  //for extracting date to human readeble formate
  extractDateTime(date, timeUnit, value = 0) {
    const newDate = new Date(date);

    switch (timeUnit) {
      case "year":
        newDate.setFullYear(newDate.getFullYear() + value);
        return newDate.getFullYear();
      case "month":
        return newDate.toLocaleString("en-IN", { month: "long" });
      case "day":
        newDate.setDate(newDate.getDate() + value);
        return newDate.toLocaleDateString("en-IN");
      case "hour":
      case "minute":
      case "second":
        if (timeUnit === "hour") newDate.setHours(newDate.getHours() + value);
        if (timeUnit === "minute")
          newDate.setMinutes(newDate.getMinutes() + value);
        if (timeUnit === "second")
          newDate.setSeconds(newDate.getSeconds() + value);
        return newDate.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
      default:
        throw new Error("Invalid time unit");
    }
  }
}

export default APIFeatures;
