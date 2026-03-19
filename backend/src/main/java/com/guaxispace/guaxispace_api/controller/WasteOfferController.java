package com.guaxispace.guaxispace_api.controller;

import com.guaxispace.guaxispace_api.dto.WasteOfferRequest;
import com.guaxispace.guaxispace_api.model.WasteOffer;
import com.guaxispace.guaxispace_api.service.WasteOfferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/offers")
@CrossOrigin(origins = "*") // Necessário para o Flutter Web ou Emulador não tomar bloqueio de CORS
public class WasteOfferController {

    @Autowired
    private WasteOfferService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WasteOffer create(@RequestBody @Valid WasteOfferRequest request) {
        return service.createFromDto(request);
    }

    @GetMapping
    public List<WasteOffer> getAll() {
        // Método auxiliar para listar tudo e testar rápido
        return service.findAll();
    }

    @GetMapping("/nearby")
    public List<WasteOffer> getNearby(
            @RequestParam double lat, 
            @RequestParam double lng, 
            @RequestParam(defaultValue = "10") double radius) {
        return service.findNearby(lat, lng, radius);
    }
}
