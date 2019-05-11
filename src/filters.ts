function decimal(value: number, numberOfDigits = 0) {
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

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function percentage(value: number) {
  return `${value * 100}%`;
}

function timeLeft(miliseconds: number): string {
  let seconds = Math.round(miliseconds / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  if (minutes < 60) {
    return `${minutes} min ${seconds} s`;
  }
  const hours = Math.floor(minutes / 60);
  minutes -= hours * 60;
  return `${hours} h ${minutes} min ${seconds} s`;
}

export default {
  decimal,
  signed,
  signedDecimal,
  capitalize,
  percentage,
  timeLeft
};
