import {assignDeep,createTypeDef} from "sasat";
import {typeDefs,inputs} from "./__generated__/typeDefs";
import {resolvers} from "./__generated__/resolver";

export const schema = {
  typeDefs: createTypeDef(
    assignDeep(typeDefs, {}),
    assignDeep(inputs, {}),
  ),
  resolvers: assignDeep(resolvers, {}),
};
