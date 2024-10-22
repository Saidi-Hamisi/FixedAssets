package com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseDocuments;

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
@Table(name = "lease_documents")
public class LeaseDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Lob
    private String documentImage;
    private String documentTitle;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "lease_id_fk")
    @JsonIgnore
    private Lease lease;
}
