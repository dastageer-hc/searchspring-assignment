import { SITE_ID, BASE_URL } from '../config';

export async function fetchProducts(query, page = 1) {
  const url = `${BASE_URL}?siteId=${SITE_ID}&q=${encodeURIComponent(query)}&resultsFormat=native&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('failed to fetch products');
  return res.json();
}
