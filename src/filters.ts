function decimal(value: number, numberOfDigits: number) {
  return value.toFixed(numberOfDigits);
}

function signed(value: number) {
  if (value >= 0) {
    return `+${value}`;
  } else {
    // negative numbers have a minus in front of them by default
    return `${value}`;
  }
}

function signedDecimal(value: number, precision: number) {
  if (value >= 0) {
    return `+${value.toFixed(precision)}`;
  } else {
    // negative numbers have a minus in front of them by default
    return `${value.toFixed(precision)}`;
  }
}

export default {
  decimal,
  signed,
  signedDecimal
}
