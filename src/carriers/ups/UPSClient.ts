import { env } from "../../config/index.js";
import { HttpClient } from "../../http/Client.js";


export class UPSClient {
  private http = new HttpClient(env.UPS_BASE_URL);

  rate(payload: unknown, token: string) {
    return this.http.post("/rating/v1/Rate", payload, {
      Authorization: `Bearer ${token}`,
    });
  }
}
