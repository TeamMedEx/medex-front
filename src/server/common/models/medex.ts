import { BaseResponse } from 'src/shared/base-response';

export class Medex {
  readonly baseResponse: BaseResponse;
  constructor() {
    this.baseResponse = {
      meta: {
        status: 500,
        message: 'Internal Server Error',
      },
      data: null,
    };
  }
}
