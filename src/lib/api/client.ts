/**
 * Typed `fetch` wrapper: the single seam between the web app and the real .NET backend.
 *
 * NOT WIRED YET: no endpoint is live, so nothing in the app calls `apiFetch` today.
 * Every function in `./resources` serves in-memory mocks and carries a one-line
 * comment with the `apiFetch` call it will use once the API is available.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** `fetch` init with an optional `json` payload that gets encoded automatically. */
export type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | null;
  json?: unknown;
};

function resolveUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path}`;
}

async function readErrorMessage(response: Response): Promise<string> {
  const text = await response.text();
  return text || `Error ${response.status} al llamar a la API`;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { json, body, headers: rawHeaders, ...rest } = options;
  const headers = new Headers(rawHeaders);

  let payload: BodyInit | null | undefined = body;
  if (json !== undefined) {
    payload = JSON.stringify(json);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const response = await fetch(resolveUrl(path), {
    ...rest,
    headers,
    body: payload,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return (await response.json()) as T;
}
