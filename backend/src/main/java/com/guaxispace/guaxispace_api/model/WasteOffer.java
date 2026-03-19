package com.guaxispace.guaxispace_api.model;

import java.math.BigDecimal;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint; // IMPORT VITAL

@Document(collection = "offers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WasteOffer {
    @Id
    private String id;
    private String description;
    private String wasteType;
    private Double weightKg;
    private BigDecimal price; // Essencial para o Marketplace

    // O campo que o seu Service estava procurando:
    private GeoJsonPoint location;

    private String status;
}
