package com.fams.fixedasset.assetmanagement.Custodian;

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
public class Custodian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String custodianName;
    private String custodianCode;
    private  String email;
    private  String department;
    private Boolean deletedFlag;
}
