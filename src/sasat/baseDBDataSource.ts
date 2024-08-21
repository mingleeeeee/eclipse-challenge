import {Fields,SasatDBDatasource,EntityType} from "sasat";
import {relationMap,tableInfo} from "./__generated__/relationMap";

export abstract class BaseDBDataSource<
  Entity extends EntityType,
  Identifiable extends object,
  Creatable extends EntityType,
  Updatable extends Identifiable,
  EntityFields extends Fields<Entity>,
  QueryResult extends Partial<Entity> & Identifiable,
> extends SasatDBDatasource<Entity, Identifiable, Creatable, Updatable, EntityFields, QueryResult> {
  protected relationMap = relationMap;
  protected tableInfo = tableInfo;
}
