import { IReviewFilter, IReviewQuery } from "../types/review.type";

export const buildReviewQuery = ({
  owner,
  product,
  rate,
  search,
}: IReviewFilter): IReviewQuery => {
  const query: any = {
    ...(owner && { owner }),
    ...(product && { product }),
    ...(rate &&
      (rate.min && rate.max
        ? { rate: { $gte: rate.min, $lte: rate.max } }
        : rate.min
        ? { rate: { $gte: rate.min } }
        : { rate: { $lte: rate.max } })),
  };

  if (search) {
    const searchTerms = search.split(" ");
    const searchQueries = searchTerms.map((term) => ({
      $or: [
        { header: new RegExp(term, "i") },
        { description: new RegExp(term, "i") },
      ],
    }));
    query.$and = [...(query.$and || []), ...searchQueries];
  }

  return query;
};
