package com.guaxispace.guaxispace_api.dto;

import java.math.BigDecimal;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WasteOfferRequest {
    private String description;
    private String wasteType;
    private Double weightKg;
    private BigDecimal price; // O campo da discórdia resolvido!
    private Double latitude;
    private Double longitude;
    private String status;
}
