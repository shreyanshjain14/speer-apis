import { Request, Response, RestController } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { UserTransformer } from '@libs/common';
import { Controller, Post, Req, Res } from '@nestjs/common';

import { AdminLoginDto, LoginDto } from '../dtos';
import { AuthApisService } from '../services';

@Controller("admin")
export class AdminAuthController extends RestController {
  constructor(private readonly authService: AuthApisService) {
    super();
  }

  @Validate(AdminLoginDto)
  @Post("/login")
  async login(
    @Dto() inputs: LoginDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const model = await this.authService.adminLogin(inputs);
    return res.success(
      await this.transform(model, new UserTransformer(), {
        req,
      })
    );
  }
}
