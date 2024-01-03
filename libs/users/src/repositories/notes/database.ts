import { INote } from "@libs/common/interfaces/note";
import { DatabaseRepository, InjectModel, Pagination } from "@libs/database";
import { NoteModel } from "@libs/users/models";
import { Injectable } from "@nestjs/common";
import { get } from "lodash";

import { NoteRepositoryContract } from "./contract";

@Injectable()
export class NoteRepository
  extends DatabaseRepository<INote>
  implements NoteRepositoryContract
{
  @InjectModel(NoteModel)
  model: NoteModel;

  async searchOne(filters?: INote, userId?: number): Promise<INote> {
    const query = this.query();

    if (filters.id) query.where("id", filters.id);
    if (userId) {
      query.where("createdBy", userId);
    }
    const result = await query.limit(1).first();
    return result;
  }

  async search(inputs: INote, userId?: number): Promise<Pagination<INote>> {
    const query = this.query();

    if (inputs.q) {
      query.where((b) => {
        b.where("description", "ilike", `%${inputs.q}%`);
      });
    }

    if (inputs.status) {
      query.where("status", inputs.status);
    }
    if (userId) {
      query.where("createdBy", userId);
    }

    return get(inputs, "paginate", true)
      ? query.paginate<INote>(inputs.page, inputs.perPage)
      : query.allPages<INote>();
  }
}
