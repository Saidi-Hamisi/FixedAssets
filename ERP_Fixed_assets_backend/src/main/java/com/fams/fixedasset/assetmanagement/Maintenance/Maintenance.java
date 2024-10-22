package com.fams.fixedasset.assetmanagement.Maintenance;

import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maintener;
    private String email;
    private String freequency;
    private Date maintDate;
    private Date nextMaintDate;
    private Integer days;
    private Long remainingDays;

    @Lob
    private byte[] data;
    private String note;
    private String status;
    //        private Long asset_id;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Asset asset;
//        @OneToOne(fetch = FetchType.LAZY, optional = false)
//        @JoinColumn(name = "asset_id", nullable = false)
//        private Asset asset;

}
