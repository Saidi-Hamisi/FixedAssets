package com.fams.fixedasset.Reports;

import com.fams.fixedasset.assetmanagement.Depreciation.Depreciation;
import com.fams.fixedasset.assetmanagement.Depreciation.DepreciationEntityRepository;
import com.fams.fixedasset.assetmanagement.Depreciation.DepreciationRepository;
import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Insurance.InsuranceRepository;
import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import com.fams.fixedasset.assetmanagement.Maintenance.MantainanceRepository;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.Warranty.WarrantyRepository;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fams.fixedasset.assetmanagement.asset.Assetrepository;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.fams.fixedasset.Reports.ExcelReportGenerator.*;

@RestController
@RequestMapping("api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private DepreciationEntityRepository depreciationRepository;

    @Autowired
    private MantainanceRepository maintenanceRepository;

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private WarrantyRepository warrantyRepository;

    @GetMapping(value = "/fixed-asset-register", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> generateFixedAssetRegisterReport() throws IOException {
        // Generate the report in Excel format
        Workbook workbook = reportService.generateFixedAssetRegisterReport();

        // Convert the workbook to a byte array
        byte[] reportBytes = convertWorkbookToByteArray(workbook);

        // Set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "fixed-asset-register.xlsx");

        // Return the report file as a byte array in the response
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(reportBytes);
    }


    @GetMapping("/asset-depreciation-report")
    public ResponseEntity<byte[]> downloadDepreciationReport(@RequestParam("assetId") String assetId) throws IOException {
        List<Depreciation> depreciationList = depreciationRepository.findAllByAssetId(assetId);
        if (depreciationList.isEmpty()) {
            String errorMessage = "Asset depreciation details do not exist for asset ID: " + assetId;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage.getBytes());
        }

        Workbook workbook = generateDepreciationReport(depreciationList);

        byte[] reportBytes = convertWorkbookToByteArray(workbook);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "depreciation-report.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(reportBytes);
    }


    @GetMapping("/maintenance-report")
    public ResponseEntity<byte[]> downloadMaintenanceReport(@RequestParam("assetId") Long assetId) throws IOException {
        List<Maintenance> maintenanceList = maintenanceRepository.getMaintenance(assetId);
        if (maintenanceList.isEmpty()) {
            String errorMessage = "Maintenance details do not exist for asset ID: " + assetId;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage.getBytes());
        }

        Workbook workbook = generateMaintenanceReport(maintenanceList);

        byte[] reportBytes = convertWorkbookToByteArray(workbook);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "maintenance-report.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(reportBytes);
    }

    @GetMapping("/insurance-report")
    public ResponseEntity<byte[]> downloadInsuranceReport(@RequestParam("assetId") Long assetId) throws IOException {
        List<Insurance> insuranceList = insuranceRepository.getInsurance(assetId);
        if (insuranceList.isEmpty()) {
            String errorMessage = "Insurance details do not exist for asset ID: " + assetId;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage.getBytes());
        }

        Workbook workbook = generateInsuranceReport(insuranceList);

        byte[] reportBytes = convertWorkbookToByteArray(workbook);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "insurance-report.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(reportBytes);
    }


    @GetMapping("/warranty-report")
    public ResponseEntity<byte[]> downloadWarrantyReport(@RequestParam("assetId") Long assetId) throws IOException {

        List<Warranty> warrantyList = warrantyRepository.getWarrantyByAssetId(assetId);

        if (warrantyList.isEmpty()) {
            String errorMessage = "Warranty details do not exist for asset ID: " + assetId;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage.getBytes());
        }

        Workbook workbook = generateWarrantyReport(warrantyList);

        byte[] reportBytes = convertWorkbookToByteArray(workbook);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "warranty-report.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(reportBytes);
    }


}


