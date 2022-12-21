export function getChangeArray(totalPrice, availableDeposit) {
  const sizes = [100, 50, 20, 10, 5];
  const changeMap = {
    '100': 0,
    '50': 0,
    '20': 0,
    '10': 0,
    '5': 0,
  };

  let change = availableDeposit - totalPrice;
  for (let i = 0; i < sizes.length; i++) {
    changeMap[sizes[i]] = Math.floor(change / sizes[i]);
    change = change % sizes[i];
  }

  return changeMap;
}
