export const formatDuration = (input) => {
  if (!input) {
    return '';
  }
  const timeValue = parseInt(input, 10);
  const unit = input.slice(-1);

  if (unit === 's') {
    const hours = Math.floor(timeValue / 3600);
    const minutes = Math.floor((timeValue % 3600) / 60);
    const seconds = timeValue % 60;

    if (hours >= 1) {
      return `${hours.toFixed(0)} hr` + ` ` + `${minutes} min`;
    } else if (minutes >= 1) {
      return `${minutes.toFixed(0)} min` + ` ` + `${seconds} sec`;
    } else {
      return `${seconds} secs`;
    }
  } else {
    throw new Error('Invalid time unit. Only seconds ("s") are supported.');
  }
};
