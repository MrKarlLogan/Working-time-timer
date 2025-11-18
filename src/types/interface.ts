export type appStateType = {
	minutesWorked: number;
	progressTimer: NodeJS.Timeout | null;
	syncTimeout: NodeJS.Timeout | null;
};

export type interfaceIsDisabledType = {
	isBlock: boolean;
	firstDateInput: HTMLInputElement;
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
	firstDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	firstLocalDate?: string | null;
	lastLocalDate?: string | null;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	firstLocalHours?: string | null;
	lastLocalHours?: string | null;
};
