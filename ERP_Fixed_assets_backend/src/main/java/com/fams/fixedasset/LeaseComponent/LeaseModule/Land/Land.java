package com.fams.fixedasset.LeaseComponent.LeaseModule.Land;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Lease;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Cacheable(false)
@Table(name = "lands")
public class Land {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Double size;
    private String location;
    private String coordinates;
    private String landRegNo;
    private String utilizationLand;
    private String layout;


    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;
}
