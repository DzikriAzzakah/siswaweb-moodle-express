const TransformDataIntoGroup = (data) => {
  // Initialize an empty object for the final result
  const result = {};

  // Iterate through each item in the data array
  data.forEach((item) => {
    // Extract the idnumber value
    const idnumber = item.idnumber;

    // Determine the group name based on the last part of the idnumber
    const groupName = idnumber.split("-").pop();

    // Check if the groupName already exists in the result object
    // If not, create an array for it
    if (!result[groupName]) {
      result[groupName] = [];
    }

    // Push the current item into the appropriate group
    result[groupName].push(item);
  });

  // Return the transformed data
  return result;
};

const TransformUnixTimestampToISOString = (unix) => {
  return new Date(unix * 1000).toISOString();
};

module.exports = { TransformDataIntoGroup, TransformUnixTimestampToISOString };
