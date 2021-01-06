package com.imgurclone.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;
import com.imgurclone.controllers.AlbumsController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Jackson Configuration that will allow us to handle lazily fetched objects
 */

@Configuration
public class JacksonConfig { // call this whatever you want

    @Autowired
    private static final Logger logger = LogManager.getLogger(JacksonConfig.class);
    @Bean
    public ObjectMapper objectMapper() {
        logger.debug("creating the ObjectMapper Bean");

        Hibernate4Module hbm = new Hibernate4Module();
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(hbm);
        return mapper;
    }
}

