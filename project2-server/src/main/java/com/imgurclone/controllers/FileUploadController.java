package com.imgurclone.controllers;

import com.imgurclone.services.S3UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;


/**
 * Rest Controller for Album objects and operations
 * Root Mapping : /users
 * Allows localhost:4200 to access
 */


@RestController
@RequestMapping("files")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Autowired
    S3UploadService s3UploadService;

    @Autowired
    ServletContext servletContext;

    @PostMapping(path = "upload")
    public ResponseEntity<?> handlePost(@RequestParam("user-file") MultipartFile multipartFile,
                                        @RequestParam String imageCaption,
                                        @RequestParam Integer albumId) throws IOException, InterruptedException {

        if(multipartFile == null ) {
            System.out.println("The file is null we aren't writing anything");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
//
        File uploadDir = (File) servletContext.getAttribute(ServletContext.TEMPDIR);
        File transferFile = new File(uploadDir + "/" + multipartFile.getOriginalFilename());
        multipartFile.transferTo(transferFile);


        // Now that file is uploaded we need to call the service to get the correct s3 url
        s3UploadService.uploadImage(transferFile, imageCaption, albumId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "POST;OPTIONS");
        headers.add("Access-Control-Max-Age", "0");
        return new ResponseEntity<String>("response" , headers, HttpStatus.OK);
    }




}
