
import { Model } from "mongoose";

interface PaginateOptions {
  page?: number;
  limit?: number;
  sort?: any;
  filter?: any;
  populate?: any;

}

export async function paginate<T>(
  model: Model<T>,
  {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    filter = {},
    populate,
  }: PaginateOptions
) {
  // ✅ SAFETY: ensure valid values
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 10, 1);

  const skip = (safePage - 1) * safeLimit;

  const query = model
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(safeLimit);

  if (populate) {
    query.populate(populate);
  }

  const [data, totalItems] = await Promise.all([
    query.exec(),
    model.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      totalItems,
      // totalPages: Math.ceil(totalItems / safeLimit),
      totalPages: Math.max(1, Math.ceil(totalItems / safeLimit)),
      currentPage: safePage,
      limit: safeLimit,
    },
  };
}
