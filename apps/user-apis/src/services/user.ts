import { INote, IUser } from "@libs/common";
import { Pagination } from "@libs/database";
import { UserLibService } from "@libs/users";
import { BadRequestException, Injectable } from "@nestjs/common";

import { UpdateNoteDto } from "../dtos/user";

@Injectable()
export class UserApiService {
  constructor(private readonly service: UserLibService) {}

  async getAllNotes(inputs: IUser, user: IUser): Promise<Pagination<IUser>> {
    return await this.service.noteRepo.search(inputs, user.id);
  }

  async getNotesById(inputs: IUser, user: IUser): Promise<IUser> {
    let note = await this.service.noteRepo.searchOne(inputs, user.id);
    if (!note) {
      throw new BadRequestException("Invalid note Id");
    } else {
      return note;
    }
  }
  async addNotes(inputs: INote, user: IUser): Promise<INote> {
    return await this.service.noteRepo.create({
      ...inputs,
      createdBy: user.id,
    });
  }

  async updateNotes(inputs: UpdateNoteDto, user: IUser): Promise<INote> {
    let note = await this.service.noteRepo.searchOne(
      {
        id: inputs.id,
      },
      user.id
    );
    if (!note) {
      throw new BadRequestException("Invalid note Id");
    }
    return (await this.service.noteRepo.updateAndReturn(
      { id: inputs.id },
      inputs
    )) as INote;
  }

  async deleteNoteById(inputs: IUser, user: IUser): Promise<boolean> {
    let note = await this.service.noteRepo.searchOne(inputs, user.id);
    if (!note) {
      throw new BadRequestException("Invalid note Id");
    } else {
      return await this.service.noteRepo.deleteWhere({ id: inputs.id }); // or we can chnage the status as inactive(soft delete)
    }
  }
}
