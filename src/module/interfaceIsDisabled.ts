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
	if (isBlock) {
		firstDateInput.disabled = true;
		lastDateInput.disabled = true;
		firstHoursInput.disabled = true;
		lastHoursInput.disabled = true;
		startButton.disabled = true;
		resetButton.disabled = false;
	} else {
		firstDateInput.disabled = false;
		lastDateInput.disabled = false;
		firstHoursInput.disabled = false;
		lastHoursInput.disabled = false;
		startButton.disabled = true;
		resetButton.disabled = true;
	}
};

export default interfaceIsDisabled;
