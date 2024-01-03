import { INote } from "@libs/common/interfaces/note";
import { Pagination, RepositoryContract } from "@libs/database";

export interface NoteRepositoryContract extends RepositoryContract<INote> {
  searchOne(params?: INote,userId?: number): Promise<INote>;
  search(params?: INote, userId?: number): Promise<Pagination<INote>>;
}
