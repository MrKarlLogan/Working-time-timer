import { validateDateType } from '../types/interface';

const validateDate = ({
	firstDateInput,
	lastDateInput,
	firstLocalDate = null,
	lastLocalDate = null,
	firstHoursInput,
	lastHoursInput,
	firstLocalHours = null,
	lastLocalHours = null,
}: validateDateType) => {
	const currentDate = new Date().toISOString().split('T')[0];
	let firstDate = firstLocalDate || firstDateInput.value || currentDate;
	let lastDate = lastLocalDate || lastDateInput.value;

	const currentHours = new Date().getHours();
	let firstHour = String(firstLocalHours || firstHoursInput.value || '0');
	let lastHour = lastLocalHours || lastHoursInput.value;

	if (
		Number(firstHour) > 24 ||
		Number(lastHour) > 24 ||
		Number(firstHour) < 0 ||
		Number(lastHour) < 0
	)
		return false;

	if (!lastDate || !lastHour) return false;

	if (firstDate > lastDate || lastDate < currentDate) return false;

	if (Number(firstHour) >= Number(lastHour)) return false;

	if (currentDate === lastDate) {
		if (Number(lastHour) <= currentHours) return false;
	}

	return true;
};

export default validateDate;
