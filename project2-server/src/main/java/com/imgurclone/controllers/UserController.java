package com.imgurclone.controllers;

import com.imgurclone.daos.AlbumDao;
import com.imgurclone.daos.UserDao;
import com.imgurclone.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("users")
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AlbumDao albumDao;

    /**
     * A request that will create a new user with a hashed password
     * @param authenticationRequest - A request object that contains username and unhashed password
     * @return Returns a 200 status code
     */
    @PostMapping(path = "createUser")
    public ResponseEntity<?> createUser(@RequestBody AuthenticationRequest authenticationRequest) {

        // TODO Check for wrong input

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(authenticationRequest.getPassword());
        User newUser = new User();
        newUser.setPasswordHash(hashedPassword);
        newUser.setEmail(authenticationRequest.getEmail());
        userDao.save(newUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Will hash the password sent from client and then compare the hashes
     * @param authenticationRequest - A custom request model that maps the username and password
     * @return 200 status code
     */
    @PostMapping(path = "/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User userResult = userDao.getByEmail(authenticationRequest.getEmail());
        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), userResult.getPasswordHash());

        //TODO future add a token to the authentication response?
        if(authenticated) {
            authenticationResponse.setId(userResult.getId());
            authenticationResponse.setEmail(userResult.getEmail());
        }

        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }

    /**
     *
     * @param request An object used to represent a favorite request - 2 integers
     *                  a userId and a favoritedAlbumId
     * @return a 200 status
     */
    @PostMapping(path = "favorites")
    public ResponseEntity<?> setFavorite(@RequestBody UserFavoritesRequest request) {
        //Album favAlbum = albumDao.getSingleAlbumById(request.getFavAlbumId());
        userDao.addFavoriteAlbum(request.getUserId(), request.getFavAlbumId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path="likes")
    @ResponseStatus(HttpStatus.CREATED)
    public void setLike(@RequestParam(name="userId")int userId, @RequestParam(name="likedAlbumId") int likedAlbumId){
        //Album likedAlbum = albumDao.getSingleAlbumById(likedAlbumId);
        userDao.addLikedAlbum(userId, likedAlbumId);
    }


}
