export function toQueryString(params: string | Record<string, any>): string {
  if (typeof params === 'string') {
    // Convert query string to an object
    const obj: Record<string, any> = {};
    const pairs = params.split('&');
    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      obj[key] = decodeURIComponent(value);
    });
    params = obj;
  }

  // Assuming params is now an object
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return queryString;
}
