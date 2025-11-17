type updateDateType = {
	dateInput: HTMLParagraphElement;
	timeInput: HTMLParagraphElement;
};

const updateDate = ({ dateInput, timeInput }: updateDateType) => {
	const date = new Date();

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	dateInput.textContent = `${day}/${month}/${year}`;
	timeInput.textContent = date.toLocaleTimeString();
};

export default updateDate;
