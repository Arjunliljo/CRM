export const extractDateTime = (date, timeUnit, value = 0) => {
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
        if (timeUnit === "minute") newDate.setMinutes(newDate.getMinutes() + value);
        if (timeUnit === "second") newDate.setSeconds(newDate.getSeconds() + value);
        return newDate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
      default:
        throw new Error("Invalid time unit");
    }
  };
  