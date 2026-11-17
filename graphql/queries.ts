export const listExpensesByUserQuery = /* GraphQL */ `
  query ListExpensesByUser($userId: String!) {
    listExpensesByUser(userId: $userId) {
      items {
        id
        userId
        title
        date
        amount
        category
        iconBgColor
        createdAt
      }
    }
  }
`;
