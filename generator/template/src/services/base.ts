import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const CancelToken = axios.CancelToken;

export function onReqFulfilledFunc(config: AxiosRequestConfig) {
  return config;
}

export function onReqRejectedFunc(error: any) {
  return Promise.reject(error);
}

export function onRespFulfilledFunc(response: any): any {
  return response;
}

export function onRespRejectedFunc(error: any): Promise<never> {
  return Promise.reject(error);
}

export const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  responseType: 'json'
};

/**
 * 新建axios请求实例
 */
export function createHttpInstance(
  options: AxiosRequestConfig,
  onReqFulfilled = onReqFulfilledFunc,
  onReqRejected = onReqRejectedFunc,
  onRespFulfilled = onRespFulfilledFunc,
  onRespRejected = onRespRejectedFunc
) {
  const httpInstance = axios.create(options);

  httpInstance.interceptors.request.use(onReqFulfilled, onReqRejected);
  httpInstance.interceptors.response.use(onRespFulfilled, onRespRejected);

  return httpInstance;
}

export class BaseService {
  httpInstance: AxiosInstance;
  cancel = () => {};

  constructor(
    config: AxiosRequestConfig = defaultConfig,
    createMethod: Function | AxiosInstance = createHttpInstance
  ) {
    if (typeof createMethod === 'function') {
      this.httpInstance = createMethod({ ...defaultConfig, ...config });
    } else {
      this.httpInstance = createMethod;
    }
  }

  async http(url: string, data: any = {}, options: AxiosRequestConfig = {}) {
    const _this = this;
    const response = await this.httpInstance({
      url,
      data,
      cancelToken: new CancelToken(function executor(c) {
        _this.cancel = c;
      }),
      ...options
    });

    return response;
  }

  cancelRequest() {
    this.cancel();
  }
}
