export type clearProgressTimerType = {
	progressTimer: NodeJS.Timeout | null;
	syncTimeout: NodeJS.Timeout | null;
};

export type updateProgressValueType = {
	minutesWorked: number;
	workedTimeMinutes: number;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
};

export type updateProgressType = {
	minutesWorked: number;
	workedTimeMinutes: number;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	progressTimer: NodeJS.Timeout | null;
	syncTimeout: NodeJS.Timeout | null;
	shouldIncrement: boolean;
};

export type startProgressTimerType = {
	workedTimeMinutes: number;
	passedMinutes: number;
	progressTimer: NodeJS.Timeout | null;
	syncTimeout: NodeJS.Timeout | null;
	minutesWorked: number;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	fisrtDateInput: HTMLInputElement;
};

export type stopProgressTimerType = {
	progressTimer: NodeJS.Timeout | null;
	syncTimeout: NodeJS.Timeout | null;
	minutesWorked: number;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
};

export type startTimerType = {
	fisrtDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	dateToLocaleFirstDate?: string | null;
	dateToLocaleLastDate?: string | null;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	dateToLocaleFirstHours?: string | null;
	dateToLocaleLastHours?: string | null;
};

export type stopTimerType = {
	fisrtDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
};
