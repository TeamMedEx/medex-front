import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';
import { ViewService } from './view.service';

@Catch(HttpException)
export class NextExceptionFilter implements ExceptionFilter {
    constructor(private viewService: ViewService) {}
    public async catch(_: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const parsedUrl = parse(request.url, true);
        this.viewService
            .getNextServer()
            .render(request, response, parsedUrl.path, parsedUrl.query);
    }
}
