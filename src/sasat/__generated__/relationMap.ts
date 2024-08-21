/* eslint-disable */
import { GQLContext } from "../context";
import { RelationMap, TableInfo, EntityResult } from "sasat";
import { User, UserIdentifiable } from "./entities/User";
export const relationMap: RelationMap<GQLContext> = { user: {} };
export const tableInfo: TableInfo = {
  user: {
    identifiableKeys: ["address"],
    identifiableFields: ["address"],
    columnMap: { address: "address", createdAt: "createdAt" },
  },
};
export type UserRelations = Record<never, never>;
export type UserWithRelations = User & UserRelations;
export type UserResult = EntityResult<UserWithRelations, UserIdentifiable>;
