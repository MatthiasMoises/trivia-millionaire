export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const formatToDollar = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

export const firstLetterUppercase = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}