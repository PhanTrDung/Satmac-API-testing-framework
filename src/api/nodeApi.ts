import request from "supertest";
import { API_PATH } from "../utils/constants";

const devUrl = process.env.DEV_URL || "http://localhost:3000";

const nodeApi = {
  getNodes: async (access_token: string) => {
    const response = await request(devUrl)
      .get(API_PATH.GET_MONITOR_NODES)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  getDevices: async (access_token: string, nodeId: string) => {
    const response = await request(devUrl)
      .get(API_PATH.GET_MONITOR_NODE_DEVICES.replace("{$node_id}", nodeId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  arrangeNodes: async (access_token: string, nodes: object) => {
    const response = await request(devUrl)
      .put(API_PATH.ARRANGE_NODES)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(nodes);

    return response;
  },

  updateDevice: async (
    access_token: string,
    nodeId: string,
    deviceId: string,
    deviceData: {
      parameter?: string;
      maximum?: string;
      timeActivity?: string;
      ip?: string;
      firmware?: string;
      active?: boolean;
    } = {}
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(
        API_PATH.UPDATE_DEVICE.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(deviceData);

    return response;
  },

  reportDeviceError: async (
    access_token: string,
    nodeId: string,
    deviceId: string,
    errorData: {
      status?: number;
      connection?: number;
      error?: string;
      errorTime?: Date;
      note?: string;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(
        API_PATH.NODES_DEVICES_STATUS.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(errorData);

    return response;
  },

  fixDeviceError: async (
    access_token: string,
    nodeId: string,
    deviceId: string,
    fixData: {
      status?: number;
      connection?: number;
      fixTime?: string;
      note?: Date;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(
        API_PATH.NODES_DEVICES_FIX.replace("{node_id}", nodeId).replace(
          "{id}",
          deviceId
        )
      )
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(fixData);

    return response;
  },
};
