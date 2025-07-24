import { Types } from "mongoose"

export function getItemsPipeline(q?: string) {
  const isNumeric = q !== undefined && !isNaN(Number(q))
  const isObjectId = q && Types.ObjectId.isValid(q)

  return [
    {
      $addFields: {
        authorObjId: { $toObjectId: "$author" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "authorObjId",
        foreignField: "_id",
        as: "itemAuthor",
      },
    },
    { $unwind: "$itemAuthor" },
    ...(q
      ? [
          {
            $match: isObjectId
              ? { _id: new Types.ObjectId(q) }
              : {
                  $or: [
                    ...(isNumeric
                      ? [
                          {
                            bid: {
                              $gte: Number(q) - 0.5,
                              $lt: Number(q) + 0.5,
                            },
                          },
                          {
                            price: {
                              $gte: Number(q) - 0.5,
                              $lt: Number(q) + 0.5,
                            },
                          },
                        ]
                      : []),
                    { title: { $regex: q, $options: "i" } },
                    { content: { $regex: q, $options: "i" } },
                    { tags: { $elemMatch: { $regex: q, $options: "i" } } },
                    { "itemAuthor.name": { $regex: q, $options: "i" } },
                    // { _id: { $regex: q, $options: "i" } },
                  ],
                },
          },
        ]
      : []),
  ]
}
