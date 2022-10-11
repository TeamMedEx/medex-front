import { HttpService, HttpModule as BaseHttpModule } from '@nestjs/axios';
import { Logger, Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [BaseHttpModule],
  exports: [BaseHttpModule],
})
export class AxiosModule extends BaseHttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  public onModuleInit(): any {
    const logger = new Logger('Axios');

    // Add request interceptor and response interceptor to log request infos
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();

        logger.log(
          `${config.method.toUpperCase()} ${config.url} ${duration}ms`,
        );

        return response;
      },
      (err) => {
        logger.error(err);
        return Promise.reject(err);
      },
    );
  }
}
