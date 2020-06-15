export const mergeObjects = (override: boolean, ...objects: Object[]): Object => {
  const accomulator: { [key: string]: any } = {};
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (!accomulator[key]) {
        accomulator[key] = value;
      } else {
        if (typeof accomulator[key] === 'object' && typeof value === 'object') {
          accomulator[key] = mergeObjects(override, accomulator[key], value);
        } else {
          if (override) {
            accomulator[key] = value;
          }
        }
      }
    }
  }
  return accomulator;
}