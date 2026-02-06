import axios, { type AxiosInstance }  from "axios";
import { NetworkError } from "../errors/NetworkError.js";


export class HttpClient {
  private client: AxiosInstance;

constructor(baseURL?: string) {
  this.client = axios.create({
    ...(baseURL ? { baseURL } : {}),
    timeout: 5000,
  });
}

  async post<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
   try {
    const res = await this.client.post<T>(
      url,
      data,
      headers ? { headers } : undefined
    );
    return res.data;
  } catch {
    throw new NetworkError("HTTP request failed");
  }
}
}
