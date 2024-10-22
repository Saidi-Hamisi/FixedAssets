package com.fams.fixedasset.LeaseComponent.LeaseModule;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Building.Building;
import com.fams.fixedasset.LeaseComponent.LeaseModule.Constants.PaymentFrequency;
import com.fams.fixedasset.LeaseComponent.LeaseModule.Constants.PaymentTiming;
import com.fams.fixedasset.LeaseComponent.LeaseModule.Land.Land;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule.LeaseArmotizationSchedule;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.RouArmotizationSchedule;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseDocuments.LeaseDocument;
import com.fams.fixedasset.LeaseComponent.LeaseModule.MotorVehecle.MotorVehicle;
import com.fams.fixedasset.LeaseComponent.LeaseModule.PlantAndMachinery.PlantAndMachinery;
import com.fams.fixedasset.LeaseComponent.LeaseModule.Software.Software;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Cacheable(false)
@Table(name = "lease")
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String leaseType;
    private String lessorCode;
    @Column(nullable = false)
    private Integer leaseTerm;
    @Column(nullable = false)
    private Date startDate;
    private Date endDate;
//    @Column(nullable = false)
    private Double initialCost;
    private Double leaseIncentive; //changed this to double
    private String leaseClassification;
    private String leaseContractNo;
    private Double fixedPmt; // lease amount
    @Column(nullable = false)
    private String lessorAccountNo;
    @Column(nullable = false)
    private Double discountRate;
    private String escalationFactor;
    private Double securityDeposit;
    @Column(nullable = false)
    private Double upfrontPmt;
    private Double depreciationRate;
    @Column(nullable = false)
    private Double leaseLiability;
    private Double rou;

    //enum
    @Enumerated(EnumType.STRING)
    private PaymentFrequency paymentFrequency;
    @Enumerated(EnumType.STRING)
    private PaymentTiming paymentTiming;


    //computed values
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(nullable = false)
    private Double computedDiscountingRate;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(nullable = false)
    private  Double computedTerm;

    //relationships
    @OneToOne(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Land land;
//
    @OneToOne(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Building building;
//
    @OneToOne(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private MotorVehicle motorVehicle;
//
    @OneToOne(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private PlantAndMachinery plantAndMachinery;

    @OneToOne(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Software software;

    @OneToMany(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<LeaseArmotizationSchedule> leaseArmotizationSchedules = new ArrayList<>();

    @OneToMany(mappedBy = "lease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<RouArmotizationSchedule> rouArmotizationSchedules = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "lease")
    @ToString.Exclude
    private List<LeaseDocument> leaseDocuments = new ArrayList<>();

    //Operation Flags
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Character postedFlag='Y';
    @Column(nullable = false)
    private Date postedTime;
    @Column(nullable = false, length = 15)
    private String postedBy;
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Character modifiedFlag='N';
    @Column(length = 15)
    private String modifiedBy;
    private Date modifiedTime;
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Character deletedFlag='N';
    private Date deleteTime;
    @Column(length = 15)
    private String deletedBy;


    public void setLand(Land land){
        land.setLease(this);
        this.land=land;
    }
    public void setBuilding(Building building){
        building.setLease(this);
        this.building=building;
    }
    public void setMotorVehicle(MotorVehicle motorVehicle){
        motorVehicle.setLease(this);
        this.motorVehicle=motorVehicle;
    }
    public void setSoftware(Software software){
        software.setLease(this);
        this.software=software;
    }
    public void setPlantAndMachinery(PlantAndMachinery plantAndMachinery){
        plantAndMachinery.setLease(this);
        this.plantAndMachinery=plantAndMachinery;
    }
    public void setLeaseDocuments( List<LeaseDocument> leaseDocuments){
        leaseDocuments.forEach(leaseDocument -> leaseDocument.setLease(this));
        this.leaseDocuments=leaseDocuments;
    }
    public void setLeaseArmotizationSchedules( List<LeaseArmotizationSchedule> leaseArmotizationSchedules){
        leaseArmotizationSchedules.forEach(leaseArmotizationSchedule -> leaseArmotizationSchedule.setLease(this));
        this.leaseArmotizationSchedules=leaseArmotizationSchedules;
    }
    public void setRouArmotizationSchedules( List<RouArmotizationSchedule> rouArmotizationSchedules){
        rouArmotizationSchedules.forEach(rouArmotizationSchedule -> rouArmotizationSchedule.setLease(this));
        this.rouArmotizationSchedules=rouArmotizationSchedules;
    }

    public Double getFixedPmt() {
        return fixedPmt;

    }
}
