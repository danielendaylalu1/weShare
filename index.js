var countPrimes = function (n) {
  let primes = [];
  for (let i = 2; i < n; i++) {
    let total = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) {
        total += 1;
      }
    }
    if (total === 2) {
      primes.push(i);
    }
  }
  return primes.length;
};

console.log(countPrimes(40000));
