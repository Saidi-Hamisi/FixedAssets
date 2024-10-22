package com.fams.fixedasset.assetmanagement.DepartmentUnit;


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
@Table(name = "assetsbydepartmentunit")
public class AssetsBydapartmentUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String departmentUnitname;
    private String numberOfAsstes;
    private String valueOfAsstes;
}
