import { itemAuthor } from "./Item/itemAuthor"
import { addEmail } from "./mutations/addEmail"
import { checkSubscriberByEmail } from "./queries/checkSubscriberByEmail"
import { itemById } from "./queries/item/itemById"
import { items } from "./queries/item/items"
import { itemsByAuthorId } from "./queries/item/itemsByAuthorId"
import { totalCount } from "./queries/count/totalCount"
import { totalCountByAuthorId } from "./queries/count/totalCountByAuthorId"
import { userById } from "./queries/user/userById"
import { users } from "./queries/user/users"
import { item } from "./queries/item/item"
import { signup } from "./auth/signup"
import { signin } from "./auth/signin"
import { logout } from "./auth/logout"
import { me } from "./auth/me"
import { updateEmail } from "./account/updateEmail"
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
    me,
  },
  Mutation: {
    addEmail,
    signup,
    signin,
    logout,
    updateEmail,
  },
  Item: {
    itemAuthor,
  },
}

export default resolvers
