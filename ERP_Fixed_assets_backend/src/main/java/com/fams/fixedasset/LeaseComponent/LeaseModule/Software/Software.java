package com.fams.fixedasset.LeaseComponent.LeaseModule.Software;

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
@Table(name = "software")
public class Software {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String version;
    private String vendor;
    private String licenseType;
    private String systemRequirement;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;
}
