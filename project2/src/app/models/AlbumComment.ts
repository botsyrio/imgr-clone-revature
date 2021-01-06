import { Album } from './album';
import { User } from './user';
/**
 * model class for a comment
 */
export class AlbumComment{
    /**
     * Constructor for the AlbumComment model
     * @param _id - the unique id of the album
     * @param _userCommenter - the user who left the comment
     * @param _dateSubmitted - the timestamp for when the comment was submitted 
     * @param _body - the body of the comment
     */
    constructor(
        private _id:number | null,
        //private _album: Album,
        private _userCommenter: User | null,
        private _dateSubmitted: Date | null,
        private _body: string
    ){}

    public get id():number|null{return this._id;}
    public set id(newId: number|null){this._id = newId}

    //public get album():Album{return this._album}
    //public set album(newAlbum: Album){this._album = this.album}

    public get userCommenter():User|null{return this._userCommenter}
    public set userCommenter(newUserCommenter: User|null){this._userCommenter = newUserCommenter}

    public get dateSubmitted(): Date|null {return this._dateSubmitted}
    public set dateSubmitted(newDate: Date|null ){this._dateSubmitted = newDate}

    public get body(): string{ return this._body}
    public set body(newBody: string){this._body = newBody}
}