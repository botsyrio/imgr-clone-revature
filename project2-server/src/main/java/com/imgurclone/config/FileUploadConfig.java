package com.imgurclone.config;

import com.imgurclone.controllers.FileUploadController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * A Configuration Class used allow our controllers to handle multipart
 * file uploads
 */

@EnableWebMvc
@Configuration
public class FileUploadConfig {

    /**
     * The MultipartResolver Bean that Spring will use
     * @return MultipartResolver
     */
    @Bean
    public MultipartResolver multipartResolver(){
        CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
        commonsMultipartResolver.setDefaultEncoding("utf-8");
        commonsMultipartResolver.setMaxUploadSize(20000000);
        commonsMultipartResolver.setResolveLazily(false);
        return commonsMultipartResolver;
    }
}
