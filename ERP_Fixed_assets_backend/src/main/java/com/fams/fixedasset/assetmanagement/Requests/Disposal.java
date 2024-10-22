package com.fams.fixedasset.assetmanagement.Requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Disposal {
    private Double disposalValue;
    private String disposalReason;
}
