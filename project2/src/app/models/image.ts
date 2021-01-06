
/**
 * model for an Image object 
 */
export class Image{ 
    /**
     * 
     * @param _id - 
     * @param _imgUrl 
     * @param _caption 
     * @param _dateSubmitted 
     */
    constructor(
        private _id: number,
        private _imgUrl: string,
        private _caption: string,
        private _dateSubmitted: Date
    ){}

    public get id(): number{return this._id;}
    public set id(myId: number){this._id=myId;}

    public get imgUrl(): string{return this._imgUrl;}
    public set imgUrl(newUrl: string){this._imgUrl=newUrl;}

    public get caption(): string{return this._caption;}
    public set caption(newCaption: string){this._caption=newCaption;}

    public get dateSubmitted(): Date{return this._dateSubmitted;}
    public set dateSubmitted(newDate: Date){this._dateSubmitted=newDate;}
}