package com.fams.fixedasset.assetmanagement.Depreciation;

import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Slf4j
public class DepreciationMethods {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private  Long id;
        private String depreciation_type;
        private Float depreciation_rate;
//        private Long category;


}
