package com.fams.fixedasset.assetmanagement.asset;

import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.Departments.Department;
import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import com.fams.fixedasset.assetmanagement.VendorDetails.Vendor;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.Workorder.Workorder;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "assets")
//@Proxy(lazy = true)
@JsonIgnoreProperties({"hibernateLazyInitializer"})

public class Asset implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetCode;
    @Lob
    private byte[] assetfile;

    private String asset_name;

    private String description;

    private String serialNo;

    private Double cost;

    private Double newValue;

    private Double assetValue;


    private Date acquisition_date;


    private String depreciation_type;

    private Double depreciation_rate;

    private String postedBy;

    private Date postedTime;

    private String modifiedBy;

    private Date modifiedTime;

    private String verifiedBy;

    private Date verifiedTime;

    private Boolean deletedFlag;

    private String lrno;

    private Long size;

    private String regNo;

    private  String engine_No;

    private String chasisNo;

    private String localAuthority;

    private String type;

    private String model;

    private String make;

    private  String remarks;

    private Integer usageLifetime;

    private String custodian;

    private String isActive;



//    relationships

    private Long category_fk;
    private String category;
    private Long department_unit_fk;
    private String department_unit;
    private Long location_fk;
    private String location;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false,cascade = CascadeType.ALL)
//    private String category;
//    @ManyToOne(fetch = FetchType.LAZY, optional = false,cascade = CascadeType.ALL)
//    private String departmentUnit;
//    @OneToMany(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    private List<Vendor> vendor;

    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Vendor vendor;

    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Insurance insurance;

    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Warranty warranty;


    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Workorder workorder;

    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Maintenance maintenance;
    private String status;


}
