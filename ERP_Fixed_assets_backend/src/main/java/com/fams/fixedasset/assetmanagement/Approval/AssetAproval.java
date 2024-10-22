package com.fams.fixedasset.assetmanagement.Approval;

import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.Utils.CONSTANTS;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class AssetAproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String assetCategory;
    private String asset_name;
    private String assetCode;
    private Double asset_Value;
    private String remarks;
    private String doneBy;
    private Date dateAcquired;
    private Double cost;
    private String custodian;
    private String location;
    private String action;
    private String status;
    private String reason;
}