package com.guaxispace.guaxispace_api.service;

import com.guaxispace.guaxispace_api.dto.WasteOfferRequest;
import com.guaxispace.guaxispace_api.model.WasteOffer;
import com.guaxispace.guaxispace_api.repository.WasteOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WasteOfferService {

    @Autowired
    private WasteOfferRepository repository;

    public WasteOffer createFromDto(WasteOfferRequest dto) {
        WasteOffer offer = new WasteOffer();
        offer.setDescription(dto.getDescription());
        offer.setWasteType(dto.getWasteType());
        offer.setWeightKg(dto.getWeightKg());
        offer.setPrice(dto.getPrice());

        if (dto.getLongitude() != null && dto.getLatitude() != null) {
            offer.setLocation(new GeoJsonPoint(dto.getLongitude(), dto.getLatitude()));
        }

        offer.setStatus("AVAILABLE");
        return repository.save(offer);
    }

    public List<WasteOffer> findAll() {
        return repository.findAll();
    }

    public List<WasteOffer> findNearby(double lat, double lng, double radiusKm) {
        Point location = new Point(lng, lat);
        Distance distance = new Distance(radiusKm, Metrics.KILOMETERS);
        return repository.findByLocationNear(location, distance);
    }
}
