export type TimeRange = 'monthly' | 'yearly' | 'all_time';

export interface CategoryBreakdownItem {
  id: string;
  name: string;
  percentage: number;
  amount: string;
  dotColor: string;
  chartColor: string;
}

export const TIME_RANGE_OPTIONS: { id: TimeRange; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
  { id: 'all_time', label: 'All Time' },
];

const CATEGORY_COLOR_MAP: Record<string, { color: string; displayName: string }> = {
  food: { color: '#4EA8DE', displayName: 'Food & Dining' },
  shopping: { color: '#E06D8C', displayName: 'Shopping' },
  transport: { color: '#C5A862', displayName: 'Transport' },
  bills: { color: '#88A774', displayName: 'Bills & Utilities' },
  entertainment: { color: '#5B6BB0', displayName: 'Entertainment' },
  health: { color: '#EC4899', displayName: 'Health & Fitness' },
  travel: { color: '#38BDF8', displayName: 'Travel' },
  education: { color: '#A855F7', displayName: 'Education' },
  other: { color: '#9D78BD', displayName: 'Others' },
};

export const computeAnalyticsBreakdown = (
  expenses: { category: string; amount: string }[]
): { totalAmount: string; totalNumeric: number; categories: CategoryBreakdownItem[] } => {
  if (!expenses || expenses.length === 0) {
    return {
      totalAmount: '₹0.00',
      totalNumeric: 0,
      categories: [],
    };
  }

  // Calculate category sums
  const categorySums: Record<string, number> = {};
  let totalSum = 0;

  expenses.forEach((item) => {
    const numeric = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0;
    const catKey = (item.category || 'other').toLowerCase();
    categorySums[catKey] = (categorySums[catKey] || 0) + numeric;
    totalSum += numeric;
  });

  if (totalSum === 0) {
    return {
      totalAmount: '₹0.00',
      totalNumeric: 0,
      categories: [],
    };
  }

  // Build sorted breakdown items
  const categories: CategoryBreakdownItem[] = Object.keys(categorySums).map((catKey) => {
    const sum = categorySums[catKey];
    const percentage = Math.max(1, Math.round((sum / totalSum) * 100));
    const config = CATEGORY_COLOR_MAP[catKey] || {
      color: '#9D78BD',
      displayName: catKey.charAt(0).toUpperCase() + catKey.slice(1),
    };

    return {
      id: catKey,
      name: config.displayName,
      percentage,
      amount: `₹${sum.toFixed(2)}`,
      dotColor: config.color,
      chartColor: config.color,
    };
  });

  // Sort descending by percentage
  categories.sort((a, b) => b.percentage - a.percentage);

  return {
    totalAmount: `₹${totalSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    totalNumeric: totalSum,
    categories,
  };
};

export const formatCurrentMonthTitle = (): string => {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};
