package com.fams.fixedasset.assetmanagement.AssetCategory;

import com.fams.fixedasset.assetmanagement.Approval.AssetAproval;
import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnit;
import com.fams.fixedasset.assetmanagement.Depreciation.Depreciation;
import com.fams.fixedasset.assetmanagement.Depreciation.DepreciationMethods;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String categoryName;
    private String categoryCode;
    private Boolean deletedFlag;
    private String depreciation_type;
    private Float depreciation_rate;


    @OneToMany(targetEntity = Asset.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Asset> assets;

}

