export const buildURI = (uri, filters) => {
  if (!filters) return uri;

  let query = '';

  const propKeys = Object.keys(filters);
  propKeys.forEach((filterKey, index) => {
    if (index === 0) {
      query += `${filterKey}=${filters[filterKey]}`;
    } else {
      query += `&${filterKey}=${filters[filterKey]}`;
    }
  });

  return `${uri}?${query}`;
};
