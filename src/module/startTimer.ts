import { startTimerType } from '../types/timer';
import validateDate from './validateDate';

const startTimer = ({
	firstDateInput,
	lastDateInput,
	dateToLocaleFirstDate = null,
	dateToLocaleLastDate = null,
	firstHoursInput,
	lastHoursInput,
	dateToLocaleFirstHours = null,
	dateToLocaleLastHours = null,
}: startTimerType) => {
	const currentDate = new Date().toISOString().split('T')[0];
	let firstDate = dateToLocaleFirstDate || firstDateInput.value || currentDate;
	let lastDate = dateToLocaleLastDate || lastDateInput.value;

	const currentHours = new Date().getHours();
	let firstHour = String(
		dateToLocaleFirstHours || firstHoursInput.value || currentHours
	);
	let lastHour = dateToLocaleLastHours || lastHoursInput.value;

	if (!firstDateInput.value) firstDateInput.value = firstDate;
	if (!lastDateInput.value) lastDateInput.value = lastDate;

	firstHoursInput.value = firstHour;
	lastHoursInput.value = lastHour;

	if (
		!validateDate({
			firstDateInput,
			lastDateInput,
			firstLocalDate: firstDate,
			lastLocalDate: lastDate,
			firstHoursInput,
			lastHoursInput,
		}) &&
		!dateToLocaleLastDate &&
		!dateToLocaleLastHours
	)
		return;

	if (lastDate)
		localStorage.setItem(
			'localDate',
			JSON.stringify({ firstDate, lastDate, firstHour, lastHour })
		);

	return { firstDate, lastDate, firstHour, lastHour };
};

export default startTimer;
