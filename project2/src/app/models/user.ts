/**
 * model class for a signed-in user
 */
export class User{
    /**
     * 
     * @param _id - unique id for the user
     * @param _password - user's password
     * @param _email - user's email
     */
    constructor(
        private _id: number,
        private _password: string,
        private _email: string
    ){}

    public get id(): number{ return this._id;}
    public set id(newId: number){this._id = newId;}

    public get password(): string{return this._password}
    public set password(newPassword: string){this._password = newPassword;}

    public get email(): string{return this._email;}
    public set email(newEmail: string){this._email = newEmail;}

}
