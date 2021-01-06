package com.imgurclone.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("test")
@RestController
public class TestController {

    /**
     * A test endpoint used to test connectivity
     * @return
     */
    @GetMapping(path = "/",produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public ResponseEntity<String> helloWorld() {
        return new ResponseEntity<>("From helloWorld Controller", HttpStatus.OK);
    }

}
