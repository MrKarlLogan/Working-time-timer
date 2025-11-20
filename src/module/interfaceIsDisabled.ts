import { interfaceIsDisabledType } from '../types/interface';

const interfaceIsDisabled = ({
	isBlock,
	firstDateInput,
	lastDateInput,
	firstHoursInput,
	lastHoursInput,
	startButton,
	resetButton,
}: interfaceIsDisabledType) => {
	const inputs = [
		firstDateInput,
		lastDateInput,
		firstHoursInput,
		lastHoursInput,
	];

	inputs.forEach((input) => (input.disabled = isBlock));

	startButton.disabled = true;
	resetButton.disabled = !isBlock;
};

export default interfaceIsDisabled;
