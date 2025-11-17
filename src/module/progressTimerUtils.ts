import {
	clearProgressTimerType,
	startProgressTimerType,
	stopProgressTimerType,
	updateProgressType,
	updateProgressValueType,
} from '../types/timer';
import { timeUtils } from './diffValue';

const clearProgressTimer = ({
	progressTimer,
	syncTimeout,
}: clearProgressTimerType) => {
	if (progressTimer) {
		clearInterval(progressTimer);
		progressTimer = null;
	}
	if (syncTimeout) {
		clearTimeout(syncTimeout);
		syncTimeout = null;
	}
};

const updateProgressValue = ({
	minutesWorked,
	workedTimeMinutes,
	progress,
	startButton,
}: updateProgressValueType) => {
	const result = (minutesWorked / workedTimeMinutes) * 100;
	progress.value = result;
	startButton.textContent = `${result.toFixed(2)}%`;
};

const utilsTimer = {
	updateProgress: ({
		minutesWorked,
		workedTimeMinutes,
		progress,
		startButton,
		firstHoursInput,
		lastHoursInput,
		progressTimer,
		syncTimeout,
		shouldIncrement,
	}: updateProgressType) => {
		const currentHours = new Date().getHours();

		if (!shouldIncrement) {
			updateProgressValue({
				minutesWorked,
				workedTimeMinutes,
				progress,
				startButton,
			});
			return;
		}

		if (
			minutesWorked !== workedTimeMinutes &&
			currentHours >= Number(firstHoursInput.value) &&
			currentHours <= Number(lastHoursInput.value)
		) {
			minutesWorked++;
			updateProgressValue({
				minutesWorked,
				workedTimeMinutes,
				progress,
				startButton,
			});
		}

		if (minutesWorked >= workedTimeMinutes) {
			clearProgressTimer({ progressTimer, syncTimeout });
			return;
		}
	},
	currentSecond: () => (60 - new Date().getSeconds()) * 1000,
};

export const startProgressTimer = ({
	workedTimeMinutes,
	passedMinutes,
	progressTimer,
	syncTimeout,
	minutesWorked,
	progress,
	startButton,
	firstHoursInput,
	lastHoursInput,
	fisrtDateInput,
}: startProgressTimerType) => {
	clearProgressTimer({ progressTimer, syncTimeout });

	if (passedMinutes > 0) minutesWorked = passedMinutes;
	updateProgressValue({
		minutesWorked,
		workedTimeMinutes,
		progress,
		startButton,
	});

	const startHour = Number(firstHoursInput.value);
	const currentHours = new Date().getHours();
	const currentMinutes = new Date().getMinutes();
	const diffDays = Math.max(0, timeUtils.daysUntilStart(fisrtDateInput.value));
	let totalWaitTime = 0;

	const startProgressInterval = (isValid: boolean) => {
		utilsTimer.updateProgress({
			minutesWorked,
			workedTimeMinutes,
			progress,
			startButton,
			firstHoursInput,
			lastHoursInput,
			progressTimer,
			syncTimeout,
			shouldIncrement: isValid,
		});
		progressTimer = setInterval(() => {
			utilsTimer.updateProgress({
				minutesWorked,
				workedTimeMinutes,
				progress,
				startButton,
				firstHoursInput,
				lastHoursInput,
				progressTimer,
				syncTimeout,
				shouldIncrement: true,
			});
		}, 60000);
	};

	if (diffDays === 0 && currentHours < startHour) {
		const hoursUntilStart = startHour - currentHours;
		const minutesUntilStart = hoursUntilStart * 60 - currentMinutes;
		const currentSecond =
			minutesUntilStart * 60 * 1000 + utilsTimer.currentSecond() - 60000;
		syncTimeout = setTimeout(() => {
			startProgressInterval(false);
		}, currentSecond);
	} else if (
		diffDays === 0 &&
		currentHours >= startHour &&
		currentHours <= Number(lastHoursInput.value)
	) {
		const currentSecond = utilsTimer.currentSecond();
		syncTimeout = setTimeout(() => {
			startProgressInterval(true);
		}, currentSecond);
	} else {
		const hoursUntilTomorrow = 24 - currentHours;
		const endCurrentDayMinutes = hoursUntilTomorrow * 60 - currentMinutes;
		const endCurrentDaySeconds =
			endCurrentDayMinutes * 60 * 1000 + utilsTimer.currentSecond() - 60000;

		totalWaitTime = endCurrentDaySeconds;

		const remainingDays = diffDays;

		if (remainingDays > 0) {
			totalWaitTime +=
				diffDays * 24 * 60 * 60 * 1000 + (startHour * 60 * 60 * 1000 - 60000);
		}

		totalWaitTime += startHour * 60 * 60 * 1000;

		syncTimeout = setTimeout(() => {
			startProgressInterval(false);
		}, totalWaitTime);
	}
};

export const stopProgressTimer = ({
	progressTimer,
	syncTimeout,
	minutesWorked,
	progress,
	startButton,
}: stopProgressTimerType) => {
	clearProgressTimer({ progressTimer, syncTimeout });
	minutesWorked = 0;
	progress.value = 0;
	startButton.textContent = 'Start a work shift';
};
