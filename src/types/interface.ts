export type interfaceIsDisabledType = {
	isBlock: boolean;
	fisrtDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	startButton: HTMLButtonElement;
	resetButton: HTMLButtonElement;
};

export type updateDateType = {
	dateInput: HTMLParagraphElement;
	timeInput: HTMLParagraphElement;
};

export type validateDateType = {
	fisrtDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	firstLocalDate?: string | null;
	lastLocalDate?: string | null;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	firstLocalHours?: string | null;
	lastLocalHours?: string | null;
};
