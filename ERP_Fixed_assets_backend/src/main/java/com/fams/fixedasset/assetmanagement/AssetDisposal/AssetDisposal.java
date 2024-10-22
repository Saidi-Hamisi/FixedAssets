package com.fams.fixedasset.assetmanagement.AssetDisposal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class AssetDisposal {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String asset_name;
        private String assetCode;
        private Double disposalValue;
        private String disposalType;
        private String remarks;
        private String status;
        private Double amount;
        private Double assetCost;
        private Date dateAdded;
        private String profit_OR_loss;
        private String assetState;

}
