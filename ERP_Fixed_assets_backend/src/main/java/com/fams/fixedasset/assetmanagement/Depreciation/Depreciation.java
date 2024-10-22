package com.fams.fixedasset.assetmanagement.Depreciation;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Slf4j
public class Depreciation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long id;
    private Long year;
    private Double cost;
    private Double rate;
    private Double begginingValue;
    private Double depreciation;
    private Double residualvalue;
    private Double endyearValue;
    private Long usefullife;

    private  String assetId;
}
