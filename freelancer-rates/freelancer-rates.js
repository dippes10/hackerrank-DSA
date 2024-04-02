/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export function dayRate(ratePerHour) {
  return ratePerHour * 8;
}

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget: the total budget
 * @param {number} ratePerHour: the rate per hour
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour) {
  const pricePerDay = dayRate(ratePerHour);
  return Math.floor(budget / pricePerDay);
}

/**
 * Calculates the discounted rate for large projects, rounded up
 *
 * @param {number} ratePerHour
 * @param {number} numDays: number of days the project spans
 * @param {number} discount: for example 20% written as 0.2
 * @returns {number} the rounded up discounted rate
 */

export function priceWithMonthlyDiscount(ratePerHour, numDays, discount) {
  const hoursPerDay = 8;
  const daysPerMonth = 22;
  const hoursPerMonth = hoursPerDay * daysPerMonth;

  const totalHours = numDays * hoursPerDay;
  const totalMonths = Math.ceil(numDays / daysPerMonth);

  const totalRegularPrice = totalHours * ratePerHour;
  const discountedPrice = totalRegularPrice * (1 - discount);

  const remainingDays = numDays % daysPerMonth;
  const remainingHours = remainingDays * hoursPerDay;
  const remainingPrice = remainingHours * ratePerHour;

  return Math.ceil(discountedPrice + remainingPrice);
}
