export class User {
	constructor(
		private readonly _id: number,
		private readonly _isBot: boolean,
		private readonly _username: string,
		private readonly _firstName: string,
		private readonly _lastName: string,
	) {}

	get id(): number {
		return this._id;
	}
	get isBot(): boolean {
		return this._isBot;
	}
	get username(): string {
		return this._username;
	}
	get firstName(): string {
		return this._firstName;
	}
	get lastName(): string {
		return this._lastName;
	}
}
