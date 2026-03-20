package com.guaxispace.guaxispace_api.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class MongoConfig {

    @Value("${SPRING_DATA_MONGODB_URI}")
    private String mongoUri;

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(this.mongoUri);
    }
}
