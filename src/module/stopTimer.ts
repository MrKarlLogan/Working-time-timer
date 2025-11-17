import { stopTimerType } from '../types/timer';

const stopTimer = ({
	fisrtDateInput,
	lastDateInput,
	firstHoursInput,
	lastHoursInput,
}: stopTimerType) => {
	fisrtDateInput.value = '';
	lastDateInput.value = '';
	firstHoursInput.value = '0';
	lastHoursInput.value = '0';

	if (localStorage.getItem('localDate')) localStorage.removeItem('localDate');
};

export default stopTimer;
