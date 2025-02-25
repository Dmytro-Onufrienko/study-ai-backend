import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from "axios";

export abstract class BaseRequest {
  protected api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
    });

    this.api.interceptors.request.use((config) => {
      config.headers = new AxiosHeaders({
        ...config.headers?.toJSON(),
        ...this.getHeaders(),
      });
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
      }
    );
  }

  protected getHeaders(): Record<string, string> {
    return {};
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.request(config);
    return response.data;
  }
}
