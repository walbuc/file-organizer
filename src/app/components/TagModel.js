import { Model, fk, attr } from "redux-orm";

export default class Tag extends Model {
  static modelName = "Tag";

  static fields = {
    files: attr(),
    tag: attr()
  };

  static parse(data) {
    return this.create(data);
  }

  toJSON() {
    return {
      ...this.ref
    };
  }

  updateFrom(tag) {
    this.update(tag);
  }
}

Tag.options = {
  idAttribute: "tag"
};
