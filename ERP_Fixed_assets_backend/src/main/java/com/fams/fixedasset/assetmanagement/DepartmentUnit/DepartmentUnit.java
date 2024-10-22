package com.fams.fixedasset.assetmanagement.DepartmentUnit;

import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Slf4j
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class DepartmentUnit {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private  Long id;
        @Column(nullable = false)
        private Long  department_fk;
        private String departmentName;
        private String departmentCode;
//        private String department;
        @OneToMany(targetEntity = DepartmentUnit.class, cascade = CascadeType.ALL)
        @JoinColumn(name = "department_unit_fk", referencedColumnName = "id")
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        private List<Asset> assets;

}
