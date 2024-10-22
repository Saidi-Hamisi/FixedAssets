package com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Lease;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Cacheable(false)
public class RouArmotizationSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer period;
    private Date date;
    private Double balance;
    private Double depreciation;
    private Double closingBal;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;

    public Double getDepreciation(){
        return (depreciation*-1);
    }
}
