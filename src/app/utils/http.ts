import axios, {AxiosHeaders, AxiosInstance, AxiosResponse, RawAxiosRequestHeaders} from 'axios'

interface IResOptions {
    useAccessToken?: boolean
}


class Http {
    axiosClient: AxiosInstance
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:6868',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
    private async _handleRefreshToken(): Promise <void> {
        const refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken) {
            const result = await this.axiosClient.post('/api/auths/refreshtoken', {
                refreshToken
            })
            if(result.data) {
                localStorage.setItem('accessToken', result.data.accessToken)
            }
        } else {
            localStorage.clear()
        }
    }
    public async getWithAutoRefreshToken(url: string, options: IResOptions): Promise<any> {
        try {
            const requestHeader: RawAxiosRequestHeaders | AxiosHeaders = {};

            if (options.useAccessToken) {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    requestHeader.authorization = `Bearer ${accessToken}`;
                }
            }
            const result = await this.axiosClient.get(url, {
                headers: requestHeader
            });
            return result.data;
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 401) {
                await this._handleRefreshToken();
                return await this.getWithAutoRefreshToken(url, options);
            } else {
                throw error;
            }
        }
    }


    public async postWithAutoRefreshToken(url: string, data: any, options: IResOptions): Promise<any> {
        try {
            const requestHeader: (RawAxiosRequestHeaders) | AxiosHeaders = {};

            if(options.useAccessToken) {
                requestHeader.authorization = `Bearer ${localStorage.getItem('accessToken')}`
            }
            const result = await this.axiosClient.post(url, data,{
                headers: requestHeader
            })

            return result.data
        } catch (error) {
            // @ts-ignore
            if(error.response.status === 401) {
                await this._handleRefreshToken()
                return await this.postWithAutoRefreshToken(url, data, options)
            }
            else{
                throw error;
            }
        }
    }
    public async putWithAutoRefreshToken(url: string, data: any, options: IResOptions): Promise<any> {
        try {
            const requestHeader: (RawAxiosRequestHeaders) | AxiosHeaders = {};

            if(options.useAccessToken) {
                requestHeader.authorization = `Bearer ${localStorage.getItem('accessToken')}`
            }
            const result = await this.axiosClient.put(url, data,{
                headers: requestHeader
            })

            return result.data
        } catch (error) {
            // @ts-ignore
            if(error.response.status === 401) {
                await this._handleRefreshToken()
                return await this.postWithAutoRefreshToken(url, data, options)
            }
        }
    }
    public async deleteWithAutoRefreshToken(url: string, options: IResOptions): Promise<any> {
        try {
            const requestHeader: RawAxiosRequestHeaders | AxiosHeaders = {};

            if (options.useAccessToken) {
                requestHeader.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
            }

            const result = await this.axiosClient.delete(url, {
                headers: requestHeader
            });

            return result.data;
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 401) {
                await this._handleRefreshToken();
                return await this.deleteWithAutoRefreshToken(url, options);
            } else {
                throw error;
            }
        }
    }

}

const http = new Http()

export default http