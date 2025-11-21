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
import { appStateType } from './types/interface';

const dateInput = document.querySelector(
	'.current-time__box_date'
) as HTMLParagraphElement;
const timeInput = document.querySelector(
	'.current-time__box_time'
) as HTMLParagraphElement;
const form = document.querySelector('.form') as HTMLFormElement;
const firstDateInput = document.querySelector(
	'.form__first-date'
) as HTMLInputElement;
const lastDateInput = document.querySelector(
	'.form__last-date'
) as HTMLInputElement;
const firstHoursBefore = document.querySelector(
	'.form__first-hour'
) as HTMLDivElement;
const lastHoursBefore = document.querySelector(
	'.form__last-hour'
) as HTMLDivElement;
const firstHoursInput = document.querySelector(
	'.form__first-hour-input'
) as HTMLInputElement;
const lastHoursInput = document.querySelector(
	'.form__last-hour-input'
) as HTMLInputElement;
const startButton = document.querySelector(
	'.form__button-start'
) as HTMLButtonElement;
const resetButton = document.querySelector(
	'.current-time__button-reset'
) as HTMLButtonElement;
const progress = document.querySelector('.progress') as HTMLProgressElement;
const clearFormButton = document.querySelector(
	'.clear-form'
) as HTMLButtonElement;

const appState: appStateType = {
	minutesWorked: 0,
	progressTimer: null,
	syncTimeout: null,
};

let mainTimer: NodeJS.Timeout | null = null;

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
			firstDateInput,
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
				appState,
				progress,
				startButton,
				firstHoursInput,
				lastHoursInput,
				firstDateInput,
			});
		}
		interfaceIsDisabled({
			isBlock: true,
			firstDateInput,
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

	clearFormButton.classList.remove('open-clear-button');

	stopProgressTimer({
		appState,
		progress,
		startButton,
	});

	const currentValue = startTimer({
		firstDateInput,
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
			appState,
			progress,
			startButton,
			firstHoursInput,
			lastHoursInput,
			firstDateInput,
		});
	}

	const inputs = [
		firstDateInput,
		lastDateInput,
		firstHoursInput.closest('.form__first-hour'),
		lastHoursInput.closest('.form__last-hour'),
	];

	inputs.forEach((input) =>
		input?.classList.remove('open-before', 'valid', 'nonValid')
	);

	interfaceIsDisabled({
		isBlock: true,
		firstDateInput,
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
		appState,
		progress,
		startButton,
	});

	stopTimer({ firstDateInput, lastDateInput, firstHoursInput, lastHoursInput });

	interfaceIsDisabled({
		isBlock: false,
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
		startButton,
		resetButton,
	});
});

form.addEventListener('input', () => {
	const hasNonEmptyValue = [
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	].some((input) => input.value);

	clearFormButton.classList.toggle('open-clear-button', hasNonEmptyValue);

	const isValid = validateDate({
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});

	const inputs = [
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	];

	inputs.forEach((input) => {
		if (input.value) {
			input?.classList.toggle('valid', isValid);
			input?.classList.toggle('nonValid', !isValid);
		} else {
			input.classList.remove('valid', 'nonValid');
		}

		if (input === firstHoursInput || input === lastHoursInput) {
			const hourContainer = input.closest(
				input === firstHoursInput ? '.form__first-hour' : '.form__last-hour'
			);
			if (input.value) {
				hourContainer?.classList.toggle('valid', isValid);
				hourContainer?.classList.toggle('nonValid', !isValid);
			} else {
				hourContainer?.classList.remove('valid', 'nonValid');
			}
		}
	});
});

firstDateInput.addEventListener('input', () => {
	startButton.disabled = !validateDate({
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

firstDateInput.addEventListener('change', () => {
	firstDateInput.classList.toggle('open-before', !!firstDateInput.value);
});

lastDateInput.addEventListener('input', () => {
	startButton.disabled = !validateDate({
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

lastDateInput.addEventListener('change', () => {
	lastDateInput.classList.toggle('open-before', !!lastDateInput.value);
});

const validateNumberInput = (input: HTMLInputElement) => {
	if (input.value === '') return;

	if (input.value.length === 2 && input.value[0] === '0') {
		input.value = input.value[1];
	}

	if (input.value.includes('.') || input.value.includes(',')) {
		const value = Number(input.value.replace(',', '.'));
		input.value = Math.round(value).toString();
	}

	const value = Number(input.value);

	if (value < 0 || value > 24) {
		input.value = value < 0 ? '0' : '24';
	}
};

const setupNumberInputValid = (input: HTMLInputElement) => {
	input.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key === '+' || e.key === '-' || e.key === 'e' || e.key === 'E') {
			e.preventDefault();
		}
	});
};

firstHoursInput.addEventListener('input', () => {
	validateNumberInput(firstHoursInput);

	startButton.disabled = !validateDate({
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

firstHoursBefore.addEventListener('click', () => {
	firstHoursInput.focus();
});

firstHoursInput.addEventListener('change', () => {
	firstHoursInput
		.closest('.form__first-hour')
		?.classList.toggle('open-before', !!firstHoursInput.value);
});

setupNumberInputValid(firstHoursInput);

lastHoursInput.addEventListener('input', () => {
	validateNumberInput(lastHoursInput);

	startButton.disabled = !validateDate({
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	});
});

lastHoursBefore.addEventListener('click', () => {
	lastHoursInput.focus();
});

lastHoursInput.addEventListener('change', () => {
	lastHoursInput
		.closest('.form__last-hour')
		?.classList.toggle('open-before', !!lastHoursInput.value);
});

setupNumberInputValid(lastHoursInput);

clearFormButton.addEventListener('click', () => {
	const inputs = [
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	];

	inputs.forEach((input) => {
		input.value = '';
		input.classList.remove('valid', 'nonValid', 'open-before');

		if (input === firstHoursInput || input === lastHoursInput) {
			const hourContainer = input.closest(
				input === firstHoursInput ? '.form__first-hour' : '.form__last-hour'
			);
			hourContainer?.classList.remove('valid', 'nonValid', 'open-before');
		}
	});

	clearFormButton.classList.remove('open-clear-button');
});

const initApp = () => {
	appState.minutesWorked = 0;
	appState.progressTimer = appState.syncTimeout = null;
	startButton.disabled = resetButton.disabled = true;
	updateDate({ dateInput, timeInput });
	getDateToLocalStorage();
	if (mainTimer) return;
	mainTimer = setInterval(() => {
		updateDate({ dateInput, timeInput });
	}, 1000);
};

initApp();
