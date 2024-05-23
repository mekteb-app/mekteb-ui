export const mergeArrays = (
  array1: any[],
  array2: any[],
  key = "id"
): any[] => {
  // Combine arrays
  const combinedArray = [...array1, ...array2];

  // Merge objects by id
  const mergedArray = Object.values(
    combinedArray.reduce((acc, obj) => {
      // If the id already exists, merge the properties
      if (acc[obj[key]]) {
        acc[obj[key]] = { ...acc[obj[key]], ...obj };
      } else {
        // If the id does not exist, add the object
        acc[obj[key]] = { ...obj };
      }
      return acc;
    }, {})
  );

  return mergedArray;
};
