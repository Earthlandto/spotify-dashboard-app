export default async function Fetcher(...args) {
  const res = await fetch(...args);

  if (res.status >= 400) {
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
