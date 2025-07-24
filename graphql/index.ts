import { itemAuthor } from "./resolvers/Item/itemAuthor"
import { addEmail } from "./resolvers/mutations/addEmail"
import { checkSubscriberByEmail } from "./resolvers/query/checkSubscriberByEmail"
import { itemById } from "./resolvers/query/item/itemById"
import { items } from "./resolvers/query/item/items"
import { itemsByAuthorId } from "./resolvers/query/item/itemsByAuthorId"
import { totalCount } from "./resolvers/query/count/totalCount"
import { totalCountByAuthorId } from "./resolvers/query/count/totalCountByAuthorId"
import { userById } from "./resolvers/query/user/userById"
import { users } from "./resolvers/query/user/users"
import { item } from "./resolvers/query/item/item"
const resolvers = {
  Query: {
    users,
    userById,
    item,
    items,
    itemById,
    itemsByAuthorId,
    checkSubscriberByEmail,
    totalCount,
    totalCountByAuthorId,
  },
  Mutation: {
    addEmail,
  },
  Item: {
    itemAuthor,
  },
}

export default resolvers
