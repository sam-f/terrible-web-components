/**
 * Quick and dirty pluralize method.
 * definitely would not use in production.
 * @param {string} string
 * @param {number} amount
 * @returns {string}
 */
export function pluralize(string, amount) {
  if (amount === 1) {
    return `${amount} ${string}`
  }

  return `${amount} ${string}s`
}
