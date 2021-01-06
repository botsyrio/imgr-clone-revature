import { AlbumComment } from './AlbumComment';
import { Image } from './image';
import { Tag } from './tag';
import { User } from './user'
/**
 * model class to represent an album
 */
export class Album{
    /**
     * constructor for the album model
     * @param _id - the unique id for the album
     * @param _title - the title of the album
     * @param _userCreator - the user who created the album
     * @param _images - the array of images that belong to the album
     * @param _upvoteCount - the number of users who have liked the album
     * @param _dateCreated - the timestamp for when the album was created
     * @param _tags - the array of tags that tag the album
     * @param _comments - the array of comments on the album
     */
    constructor(
        private _id: number,
        private _title: string,
        private _userCreator: User | null,
        private _images: Image[],
        private _upvoteCount: number,
        private _dateCreated: Date,
        private _tags: Tag[],
        private _comments: AlbumComment[]
    ){}

    /**
     * adds an image to the album's list of images
     * @param myImage - the image to be added
     */
    public addImage(myImage: Image){
        this._images.push(myImage);
    }

   /**
    * removes an image from the list of albums
    * @param victimImage - the image to be yeeted
    */
    public removeImage(victimImage: Image){
        this._images.filter((img: Image)=>{
            return(img !== victimImage)
        })
    }

    public get id(): number{ return this._id;}
    public set id(newId: number){ this._id = newId;}

    public get title(): string{ return this._title;}
    public set title(newTitle: string){ this._title = newTitle;}

    public get userCreator(): User | null{ return this._userCreator}
    public set userCreator(newUserCreator: User| null){ this._userCreator = newUserCreator}

    public get images(): Image[]{return this._images}
    public set images(newImages: Image[]){this._images = newImages}

    public get upvoteCount(): number{return this._upvoteCount}
    public set upvoteCount(newUpvoteCount:number){this._upvoteCount = newUpvoteCount}

    public get dateCreated(): Date{return this._dateCreated}
    public set dateCreated(newDateCreated: Date){this._dateCreated = newDateCreated}

    public get tags(): Tag[]{return this._tags}
    public set tags(newTags: Tag[]){this._tags = newTags}  

    public get comments(): AlbumComment[]{return this._comments}
    public set comments(newComments: AlbumComment[]){this._comments = newComments}

}