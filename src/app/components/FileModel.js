import { Model, fk, attr } from "redux-orm";

export default class File extends Model {
  static modelName = "File";

  static fields = {
    id: attr(),
    name: attr(),
    tag: fk("Tag", "fileList")
  };

  static parse(fileData) {
    return this.create(fileData);
  }

  toJSON() {
    return {
      ...this.ref
    };
  }

  updateFrom(file) {
    this.update(file);
  }
}
