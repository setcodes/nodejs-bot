export class CategoriesCourses {
	constructor(private readonly _name: string) {}

	get name(): string {
		return this._name;
	}
}
