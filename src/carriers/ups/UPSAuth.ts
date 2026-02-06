import { env } from "../../config/index.js";
import { AuthError } from "../../errors/AuthError.js";
import { HttpClient } from "../../http/Client.js";

type TokenResponse = {
  access_token: string;
  expires_in: number;
};

export class UPSAuth {
  private token?: string;
  private expiresAt?: number;
  private http = new HttpClient();

  async getToken(): Promise<string> {
    if (this.token && this.expiresAt && Date.now() < this.expiresAt) {
      return this.token;
    }

    try {
      const res = await this.http.post<TokenResponse>(
        env.UPS_AUTH_URL,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: env.UPS_CLIENT_ID,
          client_secret: env.UPS_CLIENT_SECRET,
        }).toString(),
        { "Content-Type": "application/x-www-form-urlencoded" }
      );

      this.token = res.access_token;
      this.expiresAt = Date.now() + res.expires_in * 1000;
      return this.token;
    } catch {
      throw new AuthError("Failed to authenticate with UPS");
    }
  }
}
