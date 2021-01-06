import { Album } from './album';
/**
 * model class for album tags
 */
export class Tag{
  /**
   * the constructor for the tag model
   * @param _id - unique id for tag
   * @param _tagName - the body of the tag
   */
    constructor(
      private _id: number,
      private _tagName: string  
    ){}

    public get id():number {return this._id}
    public set id(newId: number){this._id = newId}

    public get tagName():string {return this._tagName}
    public set tagName(newTagName: string){this._tagName = newTagName}
}