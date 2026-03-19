package com.guaxispace.guaxispace_api.repository;

import com.guaxispace.guaxispace_api.model.WasteOffer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import java.util.List;

public interface WasteOfferRepository extends MongoRepository<WasteOffer, String> {
    // Query geoespacial para encontrar lixo orgânico perto do comprador
    List<WasteOffer> findByLocationNear(Point location, Distance distance);
}
