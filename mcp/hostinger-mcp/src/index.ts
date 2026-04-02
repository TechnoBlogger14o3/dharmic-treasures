/**
 * Hostinger MCP — stdio server that proxies the Hostinger REST API with Bearer auth.
 * API reference: https://developers.hostinger.com/
 * Official TS SDK base URL: https://developers.hostinger.com
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const DEFAULT_BASE = 'https://developers.hostinger.com'

function getToken(): string {
  const t = process.env.HOSTINGER_API_TOKEN?.trim()
  if (!t) {
    throw new Error(
      'HOSTINGER_API_TOKEN is not set. Create an API token in Hostinger (hPanel) and export it before starting this MCP.'
    )
  }
  return t
}

function getBaseUrl(): string {
  const b = (process.env.HOSTINGER_API_BASE_URL ?? DEFAULT_BASE).replace(/\/+$/, '')
  return b
}

async function hostingerRequest(
  method: string,
  path: string,
  body?: unknown
): Promise<{ status: number; ok: boolean; data: unknown }> {
  const token = getToken()
  const base = getBaseUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${base}${normalizedPath}`

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'User-Agent': 'hostinger-mcp/1.0.0',
  }

  const init: RequestInit = {
    method: method.toUpperCase(),
    headers,
  }

  if (body !== undefined && !['GET', 'HEAD'].includes(method.toUpperCase())) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const res = await fetch(url, init)
  const text = await res.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  return { status: res.status, ok: res.ok, data }
}

const server = new McpServer({
  name: 'hostinger-mcp',
  version: '1.0.0',
})

server.tool(
  'hostinger_request',
  'Call the Hostinger API. Paths are relative to HOSTINGER_API_BASE_URL (default https://developers.hostinger.com). Example path: /api/billing/v1/catalog',
  {
    method: z
      .enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
      .describe('HTTP method'),
    path: z
      .string()
      .describe('API path, e.g. /api/billing/v1/catalog'),
    body: z
      .object({})
      .passthrough()
      .optional()
      .describe('JSON body for POST/PUT/PATCH (omit for GET/DELETE)'),
  },
  async ({ method, path, body }) => {
    const result = await hostingerRequest(method, path, body)
    const text = JSON.stringify(result, null, 2)
    return {
      content: [{ type: 'text' as const, text }],
    }
  }
)

server.tool(
  'hostinger_whoami',
  'Verify API token and base URL with a lightweight GET (default: /api/billing/v1/catalog). Override with HOSTINGER_WHOAMI_PATH.',
  {},
  async () => {
    const whoamiPath =
      (process.env.HOSTINGER_WHOAMI_PATH ?? '/api/billing/v1/catalog').trim() || '/api/billing/v1/catalog'
    const result = await hostingerRequest('GET', whoamiPath)
    const text = JSON.stringify(
      {
        baseUrl: getBaseUrl(),
        path: whoamiPath,
        ...result,
      },
      null,
      2
    )
    return {
      content: [{ type: 'text' as const, text }],
    }
  }
)

async function main() {
  getToken()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
