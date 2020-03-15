import Vue from 'vue';
import axios, { AxiosRequestConfig } from 'axios';

const CancelToken = axios.CancelToken;

export const httpInstance = axios.create({
  baseURL: ''
});

httpInstance.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export class BaseService {
  cancel = () => {};

  async http(url: string, data: any = {}, { prefix = '', ...options }: any = {}) {
    const _this = this;
    const response = await httpInstance({
      url: `${prefix}${url}`,
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

function responseSuccessInterceptor(response: any): any {
  return response;
}

function responseErrorInterceptor(error: any): Promise<never> {
  return Promise.reject(new Error('请求失败'));
}
