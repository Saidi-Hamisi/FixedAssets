package com.fams.fixedasset.assetmanagement.AssetMovement;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
public class AssetMovement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String scheduleItem;
    private Double land;
    private Double buildings;
    private Double computers;
    private Double furniture;
    private Double vehicles;
    private Double equipment;
    private Double currentAssets;
    private Double biologicalAssets;
    private Double total;



}
