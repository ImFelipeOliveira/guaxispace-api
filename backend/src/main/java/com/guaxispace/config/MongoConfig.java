package com.guaxispace.guaxispace_api.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        // Forçando a URI via código para ignorar qualquer lixo no application.properties
        return MongoClients.create("mongodb://admin:vibe_password@127.0.0.1:27017/guaxispace_db?authSource=admin");
    }
}
