package com.fams.fixedasset.assetmanagement.masterrecord;

import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.Workorder.Workorder;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "master")
//@Proxy(lazy = true)
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class MasterRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String assetCode;
    @Lob
    private byte[] assetfile;
    private String assetName;
    private String description;
    private String serialNo;
    private Double cost;
    private Date acquisitionDate;
    private String depreciationType;
    private Double depreciationRate;
    private String postedBy;
    private Date postedTime;
    private String modifiedBy;
    private Date modifiedTime;
    @Column(length = 50)
    private String verifiedBy;
    private Date verifiedTime;
    private Boolean deletedFlag;
    private String LRno;
    private Long size;
    private String regNo;
    private  String engineNo;
    private String chasisNo;
    private String localAuthority;
    private String type;
    private String model;
    private String make;
    private  String remarks;
    private Integer usageLifetime;
    private String custodian;
    private String location;
    private String category;
    private String departmentUnit;
    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Insurance insurance;

    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Warranty warranty;
    @OneToOne(mappedBy = "asset", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Workorder workorder;


}
