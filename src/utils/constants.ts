export const API_PATH = {
  LOGIN: "/api/a/login",
  // Login, get access token + refresh token
  REFRESH_TOKEN: "/api/a/token/refresh",
  // Renew refresh token
  PROFILE: "/api/u/profile",
  // Get profile
  CHANGE_PASSWORD: "/api/u/password",
  // Change password
  GET_USERS: "/api/u/users",
  // Get all users
  CREATE_USER: "/api/u/user",
  // Create user
  UPDATE_USER: "/api/u/user/{$id}",
  // Update user
  DELETE_USER: "/api/u/user/{$id}",
  // Delete user
  //TODO: unclear usage
  GET_MONITOR_NODES: "/api/u/monitor/nodes",
  // Get all nodes
  GET_MONITOR_NODE_DEVICES: "/api/u/monitor/node/{$node_id}/devices",
  // Get all devices
  ARRANGE_NODES: "/api/u/monitor/node/rearrange",
  // Arrange nodes
  UPDATE_DEVICE: "/api/u/monitor/node/{$node_id}/device/{$id}",
  // Update device
  NODES_DEVICES_STATUS: "/api/u/monitor/node/{$node_id}/device/{id}/report",
  // Get all devices's status in node
  NODES_DEVICES_FIX: "/api/u/monitor/node/{$node_id}/device/{id}/fix",
  // Fix all devices in node
  //TODO: unclear usage
  GET_SYSTEM_NODES: "/api/u/system/nodes",
  // Get all node
  CREATE_NODE: "/api/u/system/node",
  // Create node
  UPDATE_NODE: "/api/u/system/node/{$id}",
  // Update node
  DELETE_NODE: "/api/u/system/node/{$id}",
  // Delete node
  GET_SYSTEM_DEVICES: "/api/u/system/devices",
  // Get all devices in system
  GET_SYSTEM_NODE_DEVICES: "/api/u/system/node/{$node_id}/devices",
  // Get all devices in node
  CREATE_DEVICE: "/api/u/system/node/{$node_id}/device",
  // Create device in node
  UPDATE_SYSTEM_DEVICE: "/api/u/system/node/{$node_id}/device/{$id}",
  // Update device in node
  DELETE_SYSTEM_DEVICE: "/api/u/system/node/{$node_id}/device/{$id}",
  // Delete device
  GET_DEFAULT_NODE_CONFIG: "/api/u/system/node/{$id}/default",
  // Reset default node config
  SET_DEFAULT_NODE_CONFIG: "/api/u/system/node/{$id}/default",
  // Set default node config
  GET_DEFAULT_DEVICE_CONFIG:
    "/api/u/system/node/{$node_id}/device/{$id}/default",
  // Reset default device config
  SET_DEFAULT_DEVICE_CONFIG:
    "/api/u/system/node/{$node_id}/device/{$id}/default",
  // Set default device config
  NODE_LOGS: "/api/u/system/node/{$node_id}/logs",
  // Get node logs
} as const;
