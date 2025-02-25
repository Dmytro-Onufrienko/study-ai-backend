import { Injectable } from "@nestjs/common";
import { BaseApiService } from "src/base-api/base-api.service";

@Injectable()
export class PayPalService extends BaseApiService {
  constructor() {
    super(process.env.PAYPAL_API_URL);
  }

  protected getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      "Content-Type": "application/json",
    };
  }

  private async getAccessToken(): Promise<string> {
    const { access_token } = await this.post<{ access_token: string }>(
      "/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_CLIENT_SECRET,
        },
      }
    );
    return access_token;
  }
}
