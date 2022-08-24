export interface ILoggerService {
	log: (msg: string) => void;
	error: (msg: string) => void;
	warn: (msg: string) => void;
}
