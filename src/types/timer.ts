import { appStateType } from './interface';

export type clearProgressTimerType = {
	appState: Pick<appStateType, 'progressTimer' | 'syncTimeout'>;
};

export type updateProgressValueType = {
	appState: Pick<appStateType, 'minutesWorked'>;
	workedTimeMinutes: number;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
};

export type updateProgressType = {
	appState: appStateType;
	workedTimeMinutes: number;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	shouldIncrement: boolean;
};

export type startProgressTimerType = {
	workedTimeMinutes: number;
	passedMinutes: number;
	appState: appStateType;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	firstDateInput: HTMLInputElement;
};

export type stopProgressTimerType = {
	appState: appStateType;
	progress: HTMLProgressElement;
	startButton: HTMLButtonElement;
};

export type startTimerType = {
	firstDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	dateToLocaleFirstDate?: string | null;
	dateToLocaleLastDate?: string | null;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
	dateToLocaleFirstHours?: string | null;
	dateToLocaleLastHours?: string | null;
};

export type stopTimerType = {
	firstDateInput: HTMLInputElement;
	lastDateInput: HTMLInputElement;
	firstHoursInput: HTMLInputElement;
	lastHoursInput: HTMLInputElement;
};
