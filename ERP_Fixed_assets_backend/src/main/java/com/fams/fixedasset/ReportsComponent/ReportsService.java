package com.fams.fixedasset.ReportsComponent;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Lease;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule.LeaseArmotizationSchedule;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule.LeaseScheduleRepo;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseRepo;
import com.fams.fixedasset.Utils.CONSTANTS;
import com.fams.fixedasset.Utils.Responses.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@Slf4j
@RequestMapping("api/v1/reports/")
public class ReportsService {
    @Autowired
    private LeaseRepo leaseRepo;
    @Autowired
    private LeaseScheduleRepo leaseScheduleRepo;
    @Value("${reports_absolute_path}")
    private String files_path;
    @Value("${spring.datasource.url}")
    private String db;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;

    @GetMapping("/period/balance-sheet")
    public ResponseEntity<?> getBalanceSheet(@RequestParam Long leaseId, @RequestParam Integer periodId) throws FileNotFoundException, JRException, SQLException {
        //        Check if they are available
//        List<DataSubjectRequest> check = dataSubjectRequestRepo.findByEvaluationStatus(evaluationStatus);
        Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(leaseId, CONSTANTS.NO);
        if (lease.isPresent()) {
            Lease lease1 = lease.get();
            Optional<LeaseArmotizationSchedule> ls = leaseScheduleRepo.findByPeriodAndLease(periodId, lease1);
            if (ls.isPresent()) {
                Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
                String logo = files_path + "/logo.png";
                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/balance_sheet.jrxml"));
                Map<String, Object> parameter = new HashMap<String, Object>();
                parameter.put("logo", logo);
                parameter.put("period_id", periodId);
                parameter.put("lease_id", leaseId);
                JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
                byte[] data = JasperExportManager.exportReportToPdf(report);
                HttpHeaders headers = new HttpHeaders();
                headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=balancesheet.pdf");
                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
            } else {
                return ResponseEntity
                        .badRequest()
                        .body(new EntityResponse("Lease schedule id does not exist!", null, 404));
            }
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new EntityResponse("Lease not found", null, 404));
        }
    }


    @GetMapping("/period/profit-and-loss")
    public ResponseEntity<?> profitAndLoss(@RequestParam Long leaseId, @RequestParam Integer periodId) throws FileNotFoundException, JRException, SQLException {
        //        Check if they are available
//        List<DataSubjectRequest> check = dataSubjectRequestRepo.findByEvaluationStatus(evaluationStatus);
        Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(leaseId, CONSTANTS.NO);
        if (lease.isPresent()) {
            Lease lease1 = lease.get();
            Optional<LeaseArmotizationSchedule> ls = leaseScheduleRepo.findByPeriodAndLease(periodId, lease1);
            if (ls.isPresent()) {
                Connection connection = DriverManager.getConnection(this.db, this.username, this.password);
                String logo = files_path + "/logo.png";
                JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream(files_path + "/profit_and_loss.jrxml"));
                Map<String, Object> parameter = new HashMap<String, Object>();
                parameter.put("logo", logo);
                parameter.put("period_id", periodId);
                parameter.put("lease_id", leaseId);
                JasperPrint report = JasperFillManager.fillReport(compileReport, parameter, connection);
                byte[] data = JasperExportManager.exportReportToPdf(report);
                HttpHeaders headers = new HttpHeaders();
                headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=profit_and_loss.pdf");
                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
            } else {
                return ResponseEntity
                        .badRequest()
                        .body(new EntityResponse("Lease schedule id does not exist!", null, 404));
            }
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new EntityResponse("Lease not found", null, 404));
        }
    }

    @GetMapping("/all/lease/report")
    public ResponseEntity<byte[]> allLeaseReport(@RequestParam(required = false) String leaseType) throws FileNotFoundException, JRException, SQLException {
        try (Connection connection = DriverManager.getConnection(this.db, this.username, this.password)) {
            String reportFilePath = files_path + "/all_leases.jrxml";
            String logo = files_path + "/logo.png";
            JasperReport compiledReport = JasperCompileManager.compileReport(new FileInputStream(reportFilePath));
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("logo", logo);
            parameters.put("lease_type", leaseType);
            JasperPrint report = JasperFillManager.fillReport(compiledReport, parameters, connection);
            byte[] data = JasperExportManager.exportReportToPdf(report);
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=leases.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
        }
    }


}
