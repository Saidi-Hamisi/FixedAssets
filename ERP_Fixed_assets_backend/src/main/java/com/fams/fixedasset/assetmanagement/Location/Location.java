package com.fams.fixedasset.assetmanagement.Location;

import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnit;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.List;

@Slf4j
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private  String subcounty;
    private String ward;
    private  String locationCode;
    private Boolean deleteFlag;
    @OneToMany(targetEntity = DepartmentUnit.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "location_fk", referencedColumnName = "id")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Asset> assets;

}
