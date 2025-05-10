import { SITE_ID, BASE_URL } from "../config";

export async function fetchProducts(
  query,
  page = 1,
  sort = "",
  filter = "",
  facets = {}
) {
  let url = `${BASE_URL}?siteId=${SITE_ID}&q=${encodeURIComponent(
    query
  )}&resultsFormat=native&page=${page}`;

  if (sort) {
    // handle sort parameter in the format sort.[field]=[asc|desc]
    const lastUnderscoreIndex = sort.lastIndexOf("_");
    const field = sort.substring(0, lastUnderscoreIndex);
    const direction = sort.substring(lastUnderscoreIndex + 1);
    url += `&sort.${field}=${direction}`;
  }

  if (filter) {
    url += `&filter.name=${encodeURIComponent(filter)}`;
  }

  // Add facets to the URL
  Object.entries(facets).forEach(([field, values]) => {
    if (values && values.length > 0) {
      values.forEach((value) => {
        url += `&facet.${field}=${encodeURIComponent(value)}`;
      });
    }
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch products");
  return res.json();
}

export async function fetchAutocomplete(query) {
  const url = `${BASE_URL}/suggest?siteId=${SITE_ID}&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch products");
  return res.json();
}
