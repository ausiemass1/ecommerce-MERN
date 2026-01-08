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
  const skip = (page - 1) * limit;

  const query = model.find(filter).sort(sort).skip(skip).limit(limit);

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
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    },
  };
}
