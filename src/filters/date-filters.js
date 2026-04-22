import { DateTime } from 'luxon';

const ordinalDay = (day) => {
	return day > 0 // If day is greater than 0, evaluate suffix. Otherwise, return an empty string.
		? ['th', 'st', 'nd', 'rd'][
				// If day is between 4-20 OR its remainder is greater than 3, use the ordinal suffix at index = 0 ('th').
				// Otherwise, use the ordinal suffix at index = remainder (1 = 'st', 2 = 'nd', or 3 = 'rd').
				(day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10
			]
		: '';
};
const w3DateFilter = (value) => {
	return DateTime.fromISO(value, { zone: 'utc' }).toString();
};
const dateFilter = (value) => {
	const dateObj = DateTime.fromISO(value, { zone: 'utc' });

	return dateObj.toFormat(
		`EEEE d'${ordinalDay(dateObj.day)}' MMMM yyyy`,
	);
};

const olderThan = (date, days) => {
	const ms = 86400000;
	const daysMs = days * ms;
	const then = new Date(date).getTime();
  const now  = new Date().getTime();
	if (now - then < daysMs) {
		return true
	}
};

export { w3DateFilter, dateFilter, olderThan };