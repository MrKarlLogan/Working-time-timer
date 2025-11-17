import { diffValueType } from '../types/diff';

export const timeUtils = {
	diffDays: (lastDate: string, firstDate: string) => {
		return (
			Math.floor(
				(new Date(lastDate).getTime() - new Date(firstDate).getTime()) /
					(1000 * 60 * 60 * 24)
			) + 1
		);
	},
	daysPassed: (firstDate: string) => {
		return Math.floor(
			(new Date().getTime() - new Date(firstDate).getTime()) /
				(1000 * 60 * 60 * 24)
		);
	},
	daysUntilStart: (firstDate: string) => {
		return Math.floor(
			(new Date(firstDate).getTime() - new Date().getTime()) /
				(1000 * 60 * 60 * 24)
		);
	},
	workedMinutes: (lastHour: string, firstHour: string) => {
		return (Number(lastHour) - Number(firstHour)) * 60;
	},
	passedMinutes: (
		startHour: number,
		lastHour: string,
		currentHour: number,
		currentMinutes: number
	) => {
		if (currentHour < startHour) return 0;
		if (currentHour >= Number(lastHour))
			return (Number(lastHour) - startHour) * 60;
		if (currentHour === startHour) return currentMinutes;
		return (currentHour - startHour) * 60 + currentMinutes;
	},
};

const diffValue = ({
	firstDate,
	lastDate,
	firstHour,
	lastHour,
}: diffValueType) => {
	const currentDate = new Date().getDate();
	const currentHour = new Date().getHours();
	const currentMinutes = new Date().getMinutes();

	const startDate = new Date(firstDate).getDate();
	const startHour = Number(firstHour);

	const diffDays = timeUtils.diffDays(lastDate, firstDate);
	const workedMinutes = timeUtils.workedMinutes(lastHour, firstHour);
	const workedTimeMinutes = workedMinutes * diffDays;

	let passedMinutes = 0;

	if (currentDate === startDate) {
		if (currentHour > startHour) {
			passedMinutes += timeUtils.passedMinutes(
				startHour,
				lastHour,
				currentHour,
				currentMinutes
			);
		} else if (currentHour === startHour) {
			passedMinutes += currentMinutes;
		}
	}

	if (currentDate > startDate) {
		const daysPassed = timeUtils.daysPassed(firstDate);

		passedMinutes +=
			daysPassed * workedMinutes +
			timeUtils.passedMinutes(startHour, lastHour, currentHour, currentMinutes);
	}

	return { workedTimeMinutes, passedMinutes };
};

export default diffValue;
