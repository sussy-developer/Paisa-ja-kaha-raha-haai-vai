export const createExpenseMutation = /* GraphQL */ `
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
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
`;

export const deleteExpenseMutation = /* GraphQL */ `
  mutation DeleteExpense($input: DeleteExpenseInput!) {
    deleteExpense(input: $input) {
      id
    }
  }
`;
