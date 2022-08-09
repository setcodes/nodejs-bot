import chalk from 'chalk';

export const printSuccess = (message: string): void => {
	console.log(`${chalk.bgGreen('SUCCESS')} ${message}`);
};
export const printError = (message: string): void => {
	console.log(`${chalk.bgGreen('ERROR')} ${message}`);
};
export const printProcess = (message: string): void => {
	console.log(`${chalk.bgGreen('PROCESS')} ${message}`);
};
