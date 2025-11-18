import {
	clearProgressTimerType,
	startProgressTimerType,
	stopProgressTimerType,
	updateProgressType,
	updateProgressValueType,
} from '../types/timer';
import { timeUtils } from './diffValue';

const clearProgressTimer = ({ appState }: clearProgressTimerType) => {
	const { progressTimer, syncTimeout } = appState;
	if (progressTimer) {
		clearInterval(progressTimer);
		appState.progressTimer = null;
	}
	if (syncTimeout) {
		clearTimeout(syncTimeout);
		appState.syncTimeout = null;
	}
};

const updateProgressValue = ({
	appState,
	workedTimeMinutes,
	progress,
	startButton,
}: updateProgressValueType) => {
	const { minutesWorked } = appState;
	const result = (minutesWorked / workedTimeMinutes) * 100;
	progress.value = result;
	startButton.textContent = `${result.toFixed(2)}%`;
};

const utilsTimer = {
	updateProgress: ({
		appState,
		workedTimeMinutes,
		progress,
		startButton,
		firstHoursInput,
		lastHoursInput,
		shouldIncrement,
	}: updateProgressType) => {
		const currentHours = new Date().getHours();

		if (!shouldIncrement) {
			updateProgressValue({
				appState,
				workedTimeMinutes,
				progress,
				startButton,
			});
			return;
		}

		if (
			appState.minutesWorked !== workedTimeMinutes &&
			currentHours >= Number(firstHoursInput.value) &&
			currentHours <= Number(lastHoursInput.value)
		) {
			appState.minutesWorked += 1;
			console.log(appState.minutesWorked);
			updateProgressValue({
				appState,
				workedTimeMinutes,
				progress,
				startButton,
			});
		}

		if (appState.minutesWorked >= workedTimeMinutes) {
			clearProgressTimer({ appState });
			return;
		}
	},
	currentSecond: () => (60 - new Date().getSeconds()) * 1000,
};

export const startProgressTimer = ({
	workedTimeMinutes,
	passedMinutes,
	appState,
	progress,
	startButton,
	firstHoursInput,
	lastHoursInput,
	firstDateInput,
}: startProgressTimerType) => {
	clearProgressTimer({ appState });

	if (passedMinutes > 0) appState.minutesWorked = passedMinutes;
	updateProgressValue({
		appState,
		workedTimeMinutes,
		progress,
		startButton,
	});

	const startHour = Number(firstHoursInput.value);
	const currentHours = new Date().getHours();
	const currentMinutes = new Date().getMinutes();
	const diffDays = Math.max(0, timeUtils.daysUntilStart(firstDateInput.value));
	let totalWaitTime = 0;

	const startProgressInterval = (isValid: boolean) => {
		utilsTimer.updateProgress({
			appState,
			workedTimeMinutes,
			progress,
			startButton,
			firstHoursInput,
			lastHoursInput,
			shouldIncrement: isValid,
		});
		appState.progressTimer = setInterval(() => {
			utilsTimer.updateProgress({
				appState,
				workedTimeMinutes,
				progress,
				startButton,
				firstHoursInput,
				lastHoursInput,
				shouldIncrement: true,
			});
		}, 60000);
	};

	if (diffDays === 0 && currentHours < startHour) {
		const hoursUntilStart = startHour - currentHours;
		const minutesUntilStart = hoursUntilStart * 60 - currentMinutes;
		const currentSecond =
			minutesUntilStart * 60 * 1000 + utilsTimer.currentSecond() - 60000;
		appState.syncTimeout = setTimeout(() => {
			startProgressInterval(false);
		}, currentSecond);
	} else if (
		diffDays === 0 &&
		currentHours >= startHour &&
		currentHours <= Number(lastHoursInput.value)
	) {
		const currentSecond = utilsTimer.currentSecond();
		appState.syncTimeout = setTimeout(() => {
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

		appState.syncTimeout = setTimeout(() => {
			startProgressInterval(false);
		}, totalWaitTime);
	}
};

export const stopProgressTimer = ({
	appState,
	progress,
	startButton,
}: stopProgressTimerType) => {
	clearProgressTimer({ appState });
	appState.minutesWorked = 0;
	progress.value = 0;
	startButton.textContent = 'Start a work shift';
};
