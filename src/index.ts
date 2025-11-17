import diffValue from './module/diffValue';
import interfaceIsDisabled from './module/interfaceIsDisabled';
import {
	startProgressTimer,
	stopProgressTimer,
} from './module/progressTimerUtils';
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

const getDateToLocalStorage = () => {
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
			startProgressTimer({
				workedTimeMinutes: wordDaysDate.workedTimeMinutes,
				passedMinutes: wordDaysDate.passedMinutes,
				progressTimer,
				syncTimeout,
				minutesWorked,
				progress,
				startButton,
				firstHoursInput,
				lastHoursInput,
				fisrtDateInput,
			});
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

	stopProgressTimer({
		progressTimer,
		syncTimeout,
		minutesWorked,
		progress,
		startButton,
	});

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
		startProgressTimer({
			workedTimeMinutes: wordDaysDate.workedTimeMinutes,
			passedMinutes: wordDaysDate.passedMinutes,
			progressTimer,
			syncTimeout,
			minutesWorked,
			progress,
			startButton,
			firstHoursInput,
			lastHoursInput,
			fisrtDateInput,
		});
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

	stopProgressTimer({
		progressTimer,
		syncTimeout,
		minutesWorked,
		progress,
		startButton,
	});

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
	minutesWorked = 0;
	progressTimer = null;
	syncTimeout = null;
	startButton.disabled = true;
	resetButton.disabled = true;
	updateDate({ dateInput, timeInput });
	getDateToLocalStorage();
	const mainTimer = setInterval(() => {
		updateDate({ dateInput, timeInput });
	}, 1000);
};

initApp();
