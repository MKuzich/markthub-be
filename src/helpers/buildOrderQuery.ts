import { IOrderFilter, IOrderQuery } from "../types/order.type";

export const buildOrderQuery = (
  { status, createdAt, totalPrice, search }: IOrderFilter,
  owner: string
): IOrderQuery => {
  const query: any = {
    ...(owner && { owner }),
    ...(status && { status }),
    ...(createdAt &&
      (createdAt.from && createdAt.to
        ? { createdAt: { $gte: createdAt.from, $lte: createdAt.to } }
        : createdAt.from
        ? { createdAt: { $gte: createdAt.from } }
        : { createdAt: { $lte: createdAt.to } })),
    ...(totalPrice &&
      (totalPrice.min && totalPrice.max
        ? { totalPrice: { $gte: totalPrice.min, $lte: totalPrice.max } }
        : totalPrice.min
        ? { totalPrice: { $gte: totalPrice.min } }
        : { totalPrice: { $lte: totalPrice.max } })),
  };

  if (search) {
    const searchTerms = search.split(" ");
    const searchQueries = searchTerms.map((term) => ({
      $or: [
        { "destination.firstName": new RegExp(term, "i") },
        { "destination.secondName": new RegExp(term, "i") },
        { "destination.phone": new RegExp(term, "i") },
        { "destination.country": new RegExp(term, "i") },
        { "destination.city": new RegExp(term, "i") },
        { "destination.address": new RegExp(term, "i") },
        { info: new RegExp(term, "i") },
      ],
    }));
    query.$and = [...(query.$and || []), ...searchQueries];
  }

  return query;
};
