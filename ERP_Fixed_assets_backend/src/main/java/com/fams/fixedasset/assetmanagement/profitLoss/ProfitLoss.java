package com.fams.fixedasset.assetmanagement.profitLoss;

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
public class ProfitLoss {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String assetName;
    private String assetCode;
    private Double disposalValue;
    private String disposalType;
    private String remarks;
    private String status;
    private Double ammount;
    private Double assetCost;
    private Date dateAdded;
}
