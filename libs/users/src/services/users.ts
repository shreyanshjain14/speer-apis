import { Inject, Injectable } from "@nestjs/common";

import { UserLibConstants } from "../constant";
import { NoteRepositoryContract } from "../repositories";
import { UserRepositoryContract } from "../repositories/users/contract";

@Injectable()
export class UserLibService {
  constructor(
    @Inject(UserLibConstants.USER_REPOSITORY)
    public readonly repo: UserRepositoryContract,
    @Inject(UserLibConstants.NOTE_REPOSITORY)
    public readonly noteRepo: NoteRepositoryContract
  ) {}
}
