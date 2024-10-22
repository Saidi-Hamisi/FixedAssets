package com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule;

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
public class LeaseArmotizationSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer period;
    private Double escalationFactor;
    private Date date;
    private Double openingBal;
    private Double leasePayment;
    private Double discount;
    private Double closingBal;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;

    public Double getLeasePayment(){
        return (leasePayment*-1);
    }
}
