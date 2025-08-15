exports.scoreTxn = (txn) => {
  let score = 0;
  if (txn.amount > 50000) score += 35;
  if (txn.ipCountry && txn.ipCountry !== txn.billingCountry) score += 30;
  if ((txn.accountAgeDays ?? 0) < 7) score += 15;
  if ((txn.recentDeclines ?? 0) >= 3) score += 20;
  if (txn.velocity5m && txn.velocity5m > 5) score += 25;
  return Math.min(100, score);
};
