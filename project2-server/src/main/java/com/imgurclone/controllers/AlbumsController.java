package com.imgurclone.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.imgurclone.daos.AlbumDao;
import com.imgurclone.daos.CommentDao;
import com.imgurclone.daos.UserDao;
import com.imgurclone.models.Album;
import com.imgurclone.models.AlbumTag;
import com.imgurclone.models.Comment;
import com.imgurclone.models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.HibernateError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Rest Controller for Album objects and operations
 * Root Mapping : /users
 * Allows localhost:4200 to access
 */

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("albums")
public class AlbumsController {
    @Autowired
    private AlbumDao albumDao;

    @Autowired
    private UserDao userDao;


    @Autowired
    private CommentDao commentDao;

    @Autowired
    private static final Logger logger = LogManager.getLogger(AlbumsController.class);


    @Autowired
    private ObjectMapper objectMapper;

    /**
     *
     * @param request Request body does not require any params
     * @return - Will return the 10 latest albums that were created
     */

    @GetMapping(path="/homepageAlbums", produces= MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Album>> getAlbumsForHomepage(HttpServletRequest request) {
        List<Album> mostRecentAlbums = albumDao.getTenMostRecentAlbums();
        logger.debug("getAlbumsForHomepage retrieved albums. mostRecentAlbums[0].title: "+mostRecentAlbums.get(0)
                .getAlbumTitle());
        try {
            logger.debug("getAlbumsForHomepage mostRecentAlbums as json with objectMapper: "
                    +objectMapper.writeValueAsString(mostRecentAlbums));
        } catch (JsonProcessingException e) { e.printStackTrace(); }
        return new ResponseEntity<>(mostRecentAlbums,  HttpStatus.OK);
    }


    /**
     *
     * @param request
     * @param id - Path Variable that represents the id of the album we want
     * @return - The album with the corresponding id - Status code 200
     */
    @GetMapping(path="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Album> getAlbumWithId(HttpServletRequest request,
                                                @PathVariable("id") String id) {
        Album album = albumDao.getSingleAlbumById(Integer.parseInt(id));
        logger.debug("getAlbumWithId retrieved album. title: " + album.getAlbumTitle());
        try{
            logger.debug("getAlbumWithId album as json with objectMapper: "
                    + objectMapper.writeValueAsString(album)) ;
        } catch (JsonProcessingException e) { e.printStackTrace(); }

        return new ResponseEntity<>(album, HttpStatus.OK);
    }

    /**
     *
     * @param request
     * @param title - The title of the album you want
     * @return A single album that has the title in path param - json response
     */
    @GetMapping(path="/byTitle/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Album> getAlbumWithTitle(HttpServletRequest request,
                                                @PathVariable("title") String title) {
        Album album = albumDao.getSingleAlbumByTitle(title);
        logger.debug("getAlbumWithTitle retrieved album. title: " + album.getAlbumTitle());
        try{
            logger.debug("getAlbumWithTitle album as json with objectMapper: "
                    + objectMapper.writeValueAsString(album)) ;
        } catch (JsonProcessingException e) { e.printStackTrace(); }

        return new ResponseEntity<>(album, HttpStatus.OK);
    }

    /**
     *
     * @param userId The id of the user that created the album
     * @return - json of list of album(s) that were created by the user in the path param
     */
    @GetMapping(path="/byUser/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Album> getAlbumsFromUser(@PathVariable("userId") int userId) {
        User userCreator = userDao.getById(userId);
        List<Album> albumsFromUser = albumDao.getAlbumsByUserCreator(userCreator);
        logger.debug("getAlbumsFromUser retrieved albums");
        try{
            logger.debug("getAlbumsFromUser albums as json with objectMapper: "
                    + objectMapper.writeValueAsString(albumsFromUser)) ;
        } catch (JsonProcessingException e) { e.printStackTrace(); }

        return albumsFromUser;
    }

    /**
     *
     * @param tagName - a String tag that can possible be found in an album tag list
     * @return - List of album(s) that contain the tagName in their taglists
     */
    @GetMapping(path="/byTag/{tagName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List <Album> getAlbumsByTag(@PathVariable("tagName") String tagName){
        List<Album> albumsByTag = albumDao.getAlbumsByTagName(tagName);
        logger.debug("getAlbumsByTag retrieved albums");
        try{
            logger.debug("getAlbumsByTag albums as json with objectMapper: "
                    + objectMapper.writeValueAsString(albumsByTag)) ;
        } catch (JsonProcessingException e) { e.printStackTrace(); }

        return albumsByTag;

    }

    /**
     *
     * @param albumTitle - The new title for the album
     * @param userId - The userID of the user that is creating the album
     * @return - Returns a 201 status code
     */
    @PostMapping(path="/createAlbum")
    @ResponseStatus(HttpStatus.CREATED)
    public int createAlbum(@RequestParam(name = "albumTitle") String albumTitle, @RequestParam(name = "userId") int userId){
        Album myAlbum = new Album();
        myAlbum.setAlbumTitle(albumTitle);

        myAlbum.setUserCreator(userDao.getById(userId));

        Set<AlbumTag> albumTags = new HashSet<>();
        AlbumTag titleTag = new AlbumTag();
        titleTag.setTagName(albumTitle);
        titleTag.setAlbum(myAlbum);
        albumTags.add(titleTag);
        myAlbum.setTagList(albumTags);

        return albumDao.insert(myAlbum);
    }

    /**
     *
     * @param commentBody - The text that will be the comment - albumComments table
     * @param albumId - The id of the album the comment will be a part of
     * @param userId - The userId of the commenter
     * @return - Returns a 201 status code
     */
    @PostMapping(path = "/createComment")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createComment(@RequestParam(name="commentBody") String commentBody,
                                 @RequestParam(name="albumId") int albumId, @RequestParam(name = "userId")int userId){
        Comment comment = new Comment();
        comment.setAlbum(albumDao.getSingleAlbumById(albumId));
        comment.setUserCommenter(userDao.getById(userId));
        comment.setBody(commentBody);

        return commentDao.insert(comment);
    }


    @DeleteMapping(path = "/delete/{imageId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> deleteImageById(
            @PathVariable("imageId") String imageId){
        try {
            albumDao.deleteImageById(Integer.parseInt(imageId));
            logger.debug("deleteImageById  successful");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (HibernateError e) { e.printStackTrace(); }

        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    @GetMapping(path="/userFavorites/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Set<Album> getUsersFavoriteAlbums(@PathVariable(name = "userId")int userId){
        return userDao.getById(userId).getFavoriteAlbums();
    }

    /**
     *  checks if the album is contained in the user's favorites
     * @param userId - the id of the user that is checked
     * @param albumId - the id of the album that is checked
     * @return Returns a 200 -
     */
    @GetMapping(path="/isInUserFavorites/{userId}/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean isAlbumInUsersFavorites(@PathVariable(name="userId") int userId,
                                           @PathVariable(name="albumId") int albumId){
        return userDao.getById(userId).getFavoriteAlbums().contains(albumDao.getSingleAlbumById(albumId));
    }

    @GetMapping(path="/isInUserLikes/{userId}/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean isAlbumInUsersLikes(@PathVariable(name="userId") int userId,
                                           @PathVariable(name="albumId") int albumId){
        return userDao.getById(userId).getLikedAlbums().contains(albumDao.getSingleAlbumById(albumId));
    }

    @GetMapping(path="/likeCount/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public BigInteger getLikeCountForId(@PathVariable(name="albumId") int albumId){
        return albumDao.getCountAlbumLikes(albumId);
    }

        @PostMapping(path = "/createTag/{albumId}")
    public ResponseEntity<?> createNewTag(@PathVariable("albumId") Integer albumId, @RequestBody String newTag) {

        albumDao.addNewTagToAlbum(albumId, newTag);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     *  Checks whether an album belongs to a certain user
     * @param userId - The id of the user you want th check
     * @param albumId - the if of the album you want to check
     * @return - A 200 statu code
     */
    @GetMapping(path="/belongsToUser/{userId}/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean doesAlbumBelongToUser(@PathVariable(name="userId") int userId,
                                         @PathVariable(name="albumId") int albumId){
        return albumDao.getSingleAlbumById(albumId).getUserCreator().getId() == userId;
    }
}
