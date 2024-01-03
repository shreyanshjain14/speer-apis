import { Transformer } from "@libs/boat";
import { INote } from "@libs/common/interfaces";

export class NotesTransformer extends Transformer {
  async transform(model: INote): Promise<INote> {
    return {
      id: model.id,
      description: model.description,
      status: model.status,
      createdAt: model.createdAt,
    };
  }
}
