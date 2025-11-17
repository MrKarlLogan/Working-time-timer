import diffValue from './module/diffValue';
import interfaceIsDisabled from './module/interfaceIsDisabled';
import startTimer from './module/startTimer';
import stopTimer from './module/stopTimer';
import updateDate from './module/updateDate';
import validateDate from './module/validateDate';
import './style.scss';

const dateInput = document.querySelector(
	'.current-time__box_date'
) as HTMLParagraphElement;
const timeInput = document.querySelector(
	'.current-time__box_time'
) as HTMLParagraphElement;
const fisrtDateInput = document.querySelector(
	'.form__first-date'
) as HTMLInputElement;
const lastDateInput = document.querySelector(
	'.form__last-date'
) as HTMLInputElement;
const firstHoursInput = document.querySelector(
	'.form__first-hour'
) as HTMLInputElement;
const lastHoursInput = document.querySelector(
	'.form__last-hour'
) as HTMLInputElement;
const startButton = document.querySelector(
	'.form__button-start'
) as HTMLButtonElement;
const resetButton = document.querySelector(
	'.current-time__button-reset'
) as HTMLButtonElement;
const progress = document.querySelector('.progress') as HTMLProgressElement;

let minutesWorked = 0;
let progressTimer: NodeJS.Timeout | null = null;
let syncTimeout: NodeJS.Timeout | null = null;

const clearProgressTimer = () => {
	if (progressTimer) {
		clearInterval(progressTimer);
		progressTimer = null;
	}
	if (syncTimeout) {
		clearTimeout(syncTimeout);
		syncTimeout = null;
	}
};

const updateProgressValue = (
	minutesWorked: number,
	workedTimeMinutes: number
) => {
	const result = (minutesWorked / workedTimeMinutes) * 100;
	progress.value = result;
	startButton.textContent = `${result.toFixed(2)}%`;
};

const utilsTimer = {
	updateProgress: (workedTimeMinutes: number) => {
		const currentHours = new Date().getHours();

		if (
			minutesWorked !== workedTimeMinutes &&
			currentHours >= Number(firstHoursInput.value) &&
			currentHours <= Number(lastHoursInput.value)
		) {
			++minutesWorked;
			updateProgressValue(minutesWorked, workedTimeMinutes);
		}

		if (minutesWorked >= workedTimeMinutes) {
			clearProgressTimer();
			return;
		}
	},
};

const startProgressTimer = ({
	workedTimeMinutes,
	passedMinutes,
}: {
	workedTimeMinutes: number;
	passedMinutes: number;
}) => {
	clearProgressTimer();

	if (passedMinutes > 0) minutesWorked = passedMinutes;
	updateProgressValue(minutesWorked, workedTimeMinutes);

	const currentSecond = (60 - new Date().getSeconds()) * 1000;

	syncTimeout = setTimeout(() => {
		utilsTimer.updateProgress(workedTimeMinutes);

		progressTimer = setInterval(() => {
			utilsTimer.updateProgress(workedTimeMinutes);
		}, 60000);
	}, currentSecond);
};

const stopProgressTimer = () => {
	clearProgressTimer();
	minutesWorked = 0;
	progress.value = 0;
	startButton.textContent = 'Start a work shift';
};

const getDateToLocalStorage = () => {
	const currentDate = new Date().toISOString().split('T')[0];
	const lastDateToLocalStorage = localStorage.getItem('localDate');
	if (lastDateToLocalStorage) {
		const {
			firstDate: dateToLocaleFirstDate,
			lastDate: dateToLocaleLastDate,
			firstHour: dateToLocaleFirstHours,
			lastHour: dateToLocaleLastHours,
		} = JSON.parse(lastDateToLocalStorage);

		const currentValue = startTimer({
			fisrtDateInput,
			lastDateInput,
			dateToLocaleFirstDate,
			dateToLocaleLastDate,
			firstHoursInput,
			lastHoursInput,
			dateToLocaleFirstHours,
			dateToLocaleLastHours,
		});

		if (currentValue) {
			const wordDaysDate = diffValue({
				firstDate: currentValue.firstDate,
				lastDate: currentValue.lastDate,
				firstHour: currentValue.firstHour,
				lastHour: currentValue.lastHour,
			});
			startProgressTimer(wordDaysDate);
		}
		interfaceIsDisabled({
			isBlock: true,
			fisrtDateInput,
			lastDateInput,
			firstHoursInput,
			lastHoursInput,
			startButton,
			resetButton,
		});
	}
};

startButton.addEventListener('click', (e) => {
	e.preventDefault();
	const currentValue = startTimer({
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
	if (currentValue) {
		const wordDaysDate = diffValue({
			firstDate: currentValue.firstDate,
			lastDate: currentValue.lastDate,
			firstHour: currentValue.firstHour,
			lastHour: currentValue.lastHour,
		});
		startProgressTimer(wordDaysDate);
	}
	interfaceIsDisabled({
		isBlock: true,
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
		startButton,
		resetButton,
	});
});

resetButton.addEventListener('click', (e) => {
	e.preventDefault();
	stopTimer({ fisrtDateInput, lastDateInput, firstHoursInput, lastHoursInput });
	interfaceIsDisabled({
		isBlock: false,
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
		startButton,
		resetButton,
	});
	stopProgressTimer();
});

fisrtDateInput.addEventListener('input', () => {
	startButton.disabled = !validateDate({
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

lastDateInput.addEventListener('input', () => {
	startButton.disabled = !validateDate({
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

firstHoursInput.addEventListener('input', () => {
	startButton.disabled = !validateDate({
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

lastHoursInput.addEventListener('input', () => {
	startButton.disabled = !validateDate({
		fisrtDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

const initApp = () => {
	startButton.disabled = true;
	resetButton.disabled = true;
	updateDate({ dateInput, timeInput });
	getDateToLocalStorage();
	const mainTimer = setInterval(() => {
		updateDate({ dateInput, timeInput });
	}, 1000);
};

initApp();
