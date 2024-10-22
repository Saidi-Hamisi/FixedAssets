package com.fams.fixedasset.LeaseComponent.LeaseModule.PlantAndMachinery;

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
@Table(name = "plant_and_machinery")
public class PlantAndMachinery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private String serialNo;
    private String modelNo ;
    private Double capacity;
    private String status;
    private String utilizationMachinery;
    private String useLocation;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;
}
