import { ORM } from "redux-orm";
import Tags from "app/components/TagModel";
import Files from "app/components/FileModel";

//Create orm instance with models types.
//This is a singleton.

const orm = new ORM();
orm.register(Tags, Files);

export default orm;
