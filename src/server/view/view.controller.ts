import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import { ViewService } from './view.service';

@Controller()
export class ViewController {
   constructor(private viewService: ViewService) {}

   async handler(req: Request, res: Response) {
      const parsedUrl = parse(req.url, true);
      await this.viewService.getNextServer().render(req, res, parsedUrl.pathname, parsedUrl.query);
   }

   @Get('/')
   public async showHome(@Req() req: Request, @Res() res: Response) {
      const parsedUrl = parse(req.url, true);

      await this.viewService.getNextServer().render(req, res, parsedUrl.pathname, parsedUrl.query);
   }

   @Get('/login')
   public async showLogin(@Req() req: Request, @Res() res: Response) {
      const parsedUrl = parse(req.url, true);
      const customProps = { payload: 'props for login' };

      await this.viewService
         .getNextServer()
         .render(req, res, parsedUrl.pathname, Object.assign(parsedUrl.query, customProps));
   }

   @Get('/register')
   public async showRegister(@Req() req: Request, @Res() res: Response) {
      const parsedUrl = parse(req.url, true);
      const customProps = { payload: 'props for register' };

      await this.viewService
         .getNextServer()
         .render(req, res, parsedUrl.pathname, Object.assign(parsedUrl.query, customProps));
   }

   @Get('/dashboard')
   public async showDashboard(@Req() req: Request, @Res() res: Response) {
      const parsedUrl = parse(req.url, true);
      const customProps = { payload: 'props for dashboard' };

      await this.viewService
         .getNextServer()
         .render(req, res, parsedUrl.pathname, Object.assign(parsedUrl.query, customProps));
   }

   @Get('/tryout-list')
   public async showTryoutList(@Req() req: Request, @Res() res: Response) {
      const parsedUrl = parse(req.url, true);
      const customProps = { payload: 'props for dashboard' };

      await this.viewService
         .getNextServer()
         .render(req, res, parsedUrl.pathname, Object.assign(parsedUrl.query, customProps));
   }

   @Get('_next*')
   public async assets(@Req() req: Request, @Res() res: Response) {
      const parsedUrl = parse(req.url, true);
      await this.viewService.getNextServer().render(req, res, parsedUrl.pathname, parsedUrl.query);
   }
}
