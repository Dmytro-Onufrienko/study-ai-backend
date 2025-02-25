import { Injectable } from "@nestjs/common";
import { BaseRequest } from "./base-request.abstract";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class BaseApiService extends BaseRequest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "GET", url, ...config });
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "POST", url, data, ...config });
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "PUT", url, data, ...config });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "DELETE", url, ...config });
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "PATCH", url, data, ...config });
  }
}
