import { stopTimerType } from '../types/timer';

const stopTimer = ({
	firstDateInput,
	lastDateInput,
	firstHoursInput,
	lastHoursInput,
}: stopTimerType) => {
	const input = [
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	].forEach((input) => (input.value = ''));

	if (localStorage.getItem('localDate')) localStorage.removeItem('localDate');
};

export default stopTimer;
