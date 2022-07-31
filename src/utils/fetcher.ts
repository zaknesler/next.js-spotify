export const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => fetch(input, init).then(res => res.json())
