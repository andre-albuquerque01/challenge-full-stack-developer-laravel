export default function ApiAction(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_ROUTE_API
  const apiPrefix = String(process.env.NEXT_PUBLIC_ROUTE_API_PREFIX)
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
