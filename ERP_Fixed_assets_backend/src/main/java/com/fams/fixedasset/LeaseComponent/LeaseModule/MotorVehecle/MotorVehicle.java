package com.fams.fixedasset.LeaseComponent.LeaseModule.MotorVehecle;

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
@Table(name = "motor_vehicle")
public class MotorVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String make;
    private String model;
    private Date yom ;
    private String vin;
    private String color;
    private Double engineSize;
    private Double mileage;
    private String vehicleCondition ;
    private String regNo;
    private String poi;
    private String utilizationVehicle;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;
}
