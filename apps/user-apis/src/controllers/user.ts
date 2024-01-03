import { Request, Response, RestController } from "@libs/boat";
import { Dto, Validate } from "@libs/boat/validator";

import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "../../../../libs/users/src/guards/jwtGuard";
import { AddNoteDto, GetNoteDto, UpdateNoteDto } from "../dtos";
import { AuthApisService } from "../services";
import { UserApiService } from "../services/user";
import { NotesTransformer } from "@libs/common/transformers/user/note";

@Controller("users")
@UseGuards(JwtGuard)
export class UserController extends RestController {
  constructor(private readonly userService: UserApiService) {
    super();
  }

  @Get("health")
  async test(@Res() res: Response) {
    return res.success({ message: "auth apis service is working fine" });
  }

  @Get("notes")
  @Validate(GetNoteDto)
  async getNotes(
    @Dto() dto: GetNoteDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.getAllNotes(dto, req.user);
    return res.withMeta(
      await this.paginate(data, new NotesTransformer(), {
        req,
      })
    );
  }
  @Get("notes/:id")
  @Validate(GetNoteDto)
  async getNotesByID(
    @Dto() dto: GetNoteDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.getNotesById(dto, req.user);
    return res.success(
      await this.transform(data, new NotesTransformer(), {
        req,
      })
    );
  }

  @Put("notes/:id")
  @Validate(UpdateNoteDto)
  async updateNotes(
    @Dto() dto: UpdateNoteDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.updateNotes(dto, req.user);
    return res.success(
      await this.transform(data, new NotesTransformer(), {
        req,
      })
    );
  }

  @Post("notes")
  @Validate(AddNoteDto)
  @HttpCode(201)
  async addnotes(
    @Dto() dto: AddNoteDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.addNotes(dto, req.user);
    return res.success(
      await this.transform(data, new NotesTransformer(), {
        req,
      })
    );
  }

  @Delete("notes/:id")
  @Validate(GetNoteDto)
  async deleteNoteByID(
    @Dto() dto: GetNoteDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.deleteNoteById(dto, req.user);
    return res.success("Note deleted Successfully");
  }
}
