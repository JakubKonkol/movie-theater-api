export const StringFilterType = `
  input StringFilter {
    eq: String
    contains: String
    ne: String
    notContains: String
  }
`;

export const NumberFilterType = `
  input NumberFilter {
    eq: Float
    gt: Float
    lt: Float
    gte: Float
    lte: Float
  }
`;