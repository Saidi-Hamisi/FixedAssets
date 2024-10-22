package com.fams.fixedasset.LeaseComponent.LessorModule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Lessor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String lessorCode;
    @Column(length = 200, nullable = false)
    private String lessorName;
    @Column(nullable = false)
    private String phoneNo;
    @Column(length = 55, nullable = false)
    private String emailAddress;
    @Column(length = 55, nullable = false, unique = true)
    private String lessorKraPin;
    private String businessCategory;
    @Column(length = 200, nullable = false)
    private String lessorLocation;
    @Column(length = 100, nullable = false, unique = true)
    private String regDocNo;
    @Lob
    private String regDocImage;

    //*****************Operational Audit *********************
    @Column(length = 30, nullable = false)
    private String postedBy;
    @Column(nullable = false)
    private Character postedFlag = 'Y';
    @Column(nullable = false)
    private Date postedTime;
    private String modifiedBy;
    private Character modifiedFlag = 'N';
    private Date modifiedTime;
    private String verifiedBy;
    private Character verifiedFlag = 'N';
    private Date verifiedTime;
    private String deletedBy;
    private Character deletedFlag = 'N';
    private Date deletedTime;
}
