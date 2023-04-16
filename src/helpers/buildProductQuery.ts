import { IProductFilter, IProductQuery } from "../types/product.type";

export const buildProductQuery = ({
  category,
  price,
  withImage,
  withPromoPrice,
  owner,
  active,
  rate,
  totalOrders,
  withReviews,
  inStock,
  search,
}: IProductFilter): IProductQuery => {
  const query: any = {
    ...(category && { category }),
    ...(price &&
      (price.min && price.max
        ? { price: { $gte: price.min, $lte: price.max } }
        : price.min
        ? { price: { $gte: price.min } }
        : { price: { $lte: price.max } })),
    ...(withImage && { images: { $exists: true, $ne: [] } }),
    ...(withPromoPrice && { promoPrice: { $gt: 0 } }),
    ...(owner && { owner }),
    ...(active !== undefined && { active }),
    ...(rate &&
      (rate.min && rate.max
        ? { rate: { $gte: rate.min, $lte: rate.max } }
        : rate.min
        ? { rate: { $gte: rate.min } }
        : { rate: { $lte: rate.max } })),
    ...(totalOrders !== undefined && {
      totalOrders: { $gte: totalOrders },
    }),
    ...(withReviews && { reviews: { $exists: true, $ne: [] } }),
    ...(inStock && { quantity: { $gte: inStock } }),
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
