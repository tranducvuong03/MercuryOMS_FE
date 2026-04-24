/*
  SignalR configuration và helper file
  ================================
  Nếu dữ liệu chưa có, bạn điền vào file .env / .env.local:

  VITE_SIGNALR_URL=http://localhost:5000
  VITE_SIGNALR_HUB=hubs/notification
  VITE_SIGNALR_USE_DEFAULT_TRANSPORT=true
  VITE_SIGNALR_LOG_LEVEL=Information
*/

import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
  HubConnectionState,
  LogLevel
} from "@microsoft/signalr"

const SIGNALR_BASE_URL = import.meta.env.VITE_SIGNALR_URL
const SIGNALR_HUB_NAME = import.meta.env.VITE_SIGNALR_HUB
const SIGNALR_LOG_LEVEL = import.meta.env.VITE_SIGNALR_LOG_LEVEL
const SIGNALR_USE_DEFAULT_TRANSPORT = import.meta.env.VITE_SIGNALR_USE_DEFAULT_TRANSPORT === "true"

const signalRLogLevelMap: Record<string, LogLevel> = {
  Trace: LogLevel.Trace,
  Debug: LogLevel.Debug,
  Information: LogLevel.Information,
  Warning: LogLevel.Warning,
  Error: LogLevel.Error,
  Critical: LogLevel.Critical,
  None: LogLevel.None
}

const SIGNALR_URL = `${SIGNALR_BASE_URL.replace(/\/+$|^\/+/, "").replace(/\/+$/, "")}/${SIGNALR_HUB_NAME.replace(/^\/+/, "")}`

const getSignalRHeaders = (includeAuth = true): Record<string, string> => {
  const headers: Record<string, string> = {
    "Accept": "application/json"
  }

  if (includeAuth) {
    const token = localStorage.getItem("token")
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  return headers
}

const createSignalRConnection = (options?: {
  includeAuth?: boolean
  skipNegotiation?: boolean
  transport?: HttpTransportType
}): HubConnection => {
  const transport = options?.transport ?? (
    SIGNALR_USE_DEFAULT_TRANSPORT
      ? HttpTransportType.WebSockets
      : HttpTransportType.WebSockets | HttpTransportType.LongPolling
  )

  return new HubConnectionBuilder()
    .withUrl(SIGNALR_URL, {
      transport,
      skipNegotiation: options?.skipNegotiation ?? false,
      headers: getSignalRHeaders(options?.includeAuth ?? true)
    })
    .configureLogging(signalRLogLevelMap[SIGNALR_LOG_LEVEL] ?? LogLevel.Information)
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .build()
}

const ensureSignalRStarted = async (connection: HubConnection): Promise<HubConnection> => {
  if (connection.state === HubConnectionState.Disconnected) {
    await connection.start()
  }

  return connection
}

const stopSignalRConnection = async (connection: HubConnection): Promise<void> => {
  if (
    connection.state === HubConnectionState.Connected ||
    connection.state === HubConnectionState.Reconnecting
  ) {
    await connection.stop()
  }
}

export {
  SIGNALR_BASE_URL,
  SIGNALR_HUB_NAME,
  SIGNALR_URL,
  SIGNALR_LOG_LEVEL,
  SIGNALR_USE_DEFAULT_TRANSPORT,
  createSignalRConnection,
  ensureSignalRStarted,
  stopSignalRConnection,
  getSignalRHeaders
}
