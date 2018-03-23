/**
 * @param {object} actionTypes
 * @param {...string} namespace
 *
 * @return {object}
 * */
export default function(actionTypes, ...namespace) {
  return Object.entries(actionTypes).reduce((map, [key]) => {
    return {
      ...map,
      [key]: [...namespace, key].join('/'),
    };
  }, new Map());
};
