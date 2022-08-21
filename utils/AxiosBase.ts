import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import logger from './Logger'

export class AxiosBase {
  protected _baseUrl: URL
  private _client: AxiosInstance
  protected _authorization: string

  get client() {
    return this._client
  }

  constructor(url: URL, authorization: string) {
    this._baseUrl = url
    this._authorization = authorization
    this._client = this.cofigureAxios()
  }

  private manageAxiosResponse(resp: AxiosResponse) {
    logger.error(resp.request, resp.status, resp.statusText, resp.headers, resp.data)
  }

  private manageAxiosError(err: AxiosError) {
    logger.error(err.message, err.code, err.stack, err.response)
  }

  private cofigureAxios() {
    const cli = axios.create({
      baseURL: this._baseUrl.href,
      headers: {
        Authorization: this._authorization,
        Accept: 'application/json',
      },
    })

    cli.interceptors.response.use(
      (response) => {
        this.manageAxiosResponse(response)
        return response
      },
      (err: AxiosError) => {
        this.manageAxiosError(err)
        return Promise.reject(err)
      }
    )

    return cli
  }
}
