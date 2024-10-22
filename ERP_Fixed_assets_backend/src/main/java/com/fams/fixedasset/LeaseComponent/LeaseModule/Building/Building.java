package com.fams.fixedasset.LeaseComponent.LeaseModule.Building;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Lease;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Cacheable(false)
@Table(name = "buildings")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String buildingName;
    private String buildingAddress;
    private String buildingLocation;
    private Double floorSpace;
    private String utilizationBuilding;
    @Lob
    private String buidingLayout ;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;
}
