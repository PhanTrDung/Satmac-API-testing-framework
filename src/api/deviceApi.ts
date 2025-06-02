import request from "supertest";
import { API_PATH } from "../utils/constants";

const devUrl = process.env.DEV_URL || "http://localhost:3000";

const deviceApi = {
  getNodes: async (
    access_token: string,
    query: {
      limit?: number;
      page?: number;
      name?: string;
      status?: number;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .get(API_PATH.GET_SYSTEM_NODES)
      .query(query)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  createNode: async (
    access_token: string,
    nodeData: {
      name?: string;
      mac?: string;
      longitude?: number;
      latitude?: number;
      active?: boolean;
      connectType?: number;
      ispeed?: number;
      bandwidth?: number;
      rssi?: number;
      trackingMode?: string;
      rotationAngle?: number;
      init?: boolean;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .post(API_PATH.CREATE_NODE)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(nodeData);

    return response;
  },

  updateNode: async (
    access_token: string,
    nodeId: string,
    nodeData: {
      name?: string;
      mac?: string;
      longitude?: number;
      latitude?: number;
      active?: boolean;
      connectType?: number;
      ispeed?: number;
      bandwidth?: number;
      rssi?: number;
      trackingMode?: string;
      rotationAngle?: number;
      init?: boolean;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(API_PATH.UPDATE_NODE.replace("{id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(nodeData);

    return response;
  },

  deleteNode: async (access_token: string, nodeId: string): Promise<any> => {
    const response = await request(devUrl)
      .delete(API_PATH.DELETE_NODE.replace("{id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  getSystemDevices: async (
    access_token: string,
    query: {
      limit?: number;
      page?: number;
      name?: string;
      status?: number;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .get(API_PATH.GET_SYSTEM_DEVICES)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  getDevices: async (
    access_token: string,
    nodeId: string,
    query: {
      name?: string;
      status?: number;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .get(API_PATH.GET_SYSTEM_NODE_DEVICES.replace("{node_id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .query(query);

    return response;
  },

  createDevice: async (
    access_token: string,
    nodeId: string,
    deviceData: {
      name: string;
      type: string;
      parameter?: string;
      maximum?: string;
      timeActivity?: string;
      ip?: string;
      firmware?: string;
      active?: boolean;
      init?: boolean;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .post(API_PATH.CREATE_DEVICE.replace("{node_id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(deviceData);

    return response;
  },

  updateDevice: async (
    access_token: string,
    nodeId: string,
    deviceId: string,
    deviceData: {
      name: string;
      type: string;
      parameter?: string;
      maximum?: string;
      timeActivity?: string;
      ip?: string;
      firmware?: string;
      active?: boolean;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(
        API_PATH.UPDATE_SYSTEM_DEVICE.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(deviceData);

    return response;
  },

  deleteDevice: async (
    access_token: string,
    nodeId: string,
    deviceId: string
  ): Promise<any> => {
    const response = await request(devUrl)
      .delete(
        API_PATH.DELETE_SYSTEM_DEVICE.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  getDefaultNodeConfig: async (
    access_token: string,
    nodeId: string
  ): Promise<any> => {
    const response = await request(devUrl)
      .get(API_PATH.GET_DEFAULT_NODE_CONFIG.replace("{id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  setDefaultNodeConfig: async (
    access_token: string,
    nodeId: string,
    config: {
      name: string;
      mac: string;
      longitude?: number;
      latitude?: number;
      connectType: number;
      ispeed?: number;
      bandwidth?: number;
      rssi?: number;
      trackingMode?: number;
      rotationAngle?: number;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(API_PATH.SET_DEFAULT_NODE_CONFIG.replace("{id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(config);

    return response;
  },

  getDefaultDeviceConfig: async (
    access_token: string,
    nodeId: string,
    deviceId: string
  ): Promise<any> => {
    const response = await request(devUrl)
      .get(
        API_PATH.GET_DEFAULT_DEVICE_CONFIG.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  setDefaultDeviceConfig: async (
    access_token: string,
    nodeId: string,
    deviceId: string,
    config: {
      name: string;
      type: string;
      parameter?: string;
      maximum?: string;
      timeActivity?: string;
      ip?: string;
      firmware?: string;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(
        API_PATH.SET_DEFAULT_DEVICE_CONFIG.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(config);

    return response;
  },

  getNodeLogs: async (
    access_token: string,
    nodeId: string,
    query: {
      limit?: number;
      page?: number;
      device_id?: string;
      timeSet?: Date;
      timeSet_end?: Date;
    }
  ): Promise<any> => {
    const queryParams: Record<string, any> = { ...query };

    if (query.timeSet instanceof Date) {
      queryParams.timeSet = query.timeSet.toISOString();
    }
    if (query.timeSet_end instanceof Date) {
      queryParams.timeSet_end = query.timeSet_end.toISOString();
    }

    const response = await request(devUrl)
      .get(API_PATH.NODE_LOGS.replace("{node_id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .query(query);

    return response;
  },
};
