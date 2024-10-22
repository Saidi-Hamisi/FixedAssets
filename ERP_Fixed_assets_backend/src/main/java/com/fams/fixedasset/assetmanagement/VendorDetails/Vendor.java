package com.fams.fixedasset.assetmanagement.VendorDetails;

import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vendorName;
    @Lob
    private byte[] data;
    private String address;
    private String taxid;
    private Long phone;
    private String location;
    private String email;
    private String website;
    private String category;
    private String note;
//    private Long asset_id;
    @OneToOne(fetch = FetchType.LAZY,optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Asset asset;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    private Asset asset;
////    @OneToOne
//    @PrimaryKeyJoinColumn
//
//
//    @OneToMany(cascade=CascadeType.ALL, mappedBy="ReleaseDateType")
//    private List<CacheMedia> cacheMedias ;


//    @OneToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "asset_id")
//    private Asset asset;

}
