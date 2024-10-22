package com.fams.fixedasset.Reports;


import com.fams.fixedasset.assetmanagement.Depreciation.Depreciation;
import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class ExcelReportGenerator {

    public static Workbook generateFixedAssetRegisterReport(List<Asset> assets) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Fixed Asset Register");

        // Apply sheet formatting
        sheet.setFitToPage(true);
        sheet.setHorizontallyCenter(true);

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Asset Code");
        headerRow.createCell(1).setCellValue("Asset Name");
        headerRow.createCell(2).setCellValue("Description");
        headerRow.createCell(3).setCellValue("Serial No");
        headerRow.createCell(4).setCellValue("Cost");
        // Add more columns as needed

        // Apply header row formatting
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        for (Cell cell : headerRow) {
            cell.setCellStyle(headerStyle);
        }

        int rowIndex = 1;
        CellStyle dataRowStyle = workbook.createCellStyle();
        dataRowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        for (Asset asset : assets) {
            Row dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(asset.getAssetCode());
            dataRow.createCell(1).setCellValue(asset.getAsset_name());
            dataRow.createCell(2).setCellValue(asset.getDescription());
            dataRow.createCell(3).setCellValue(asset.getSerialNo());
            dataRow.createCell(4).setCellValue(asset.getCost());
            // Set values for additional columns

            // Apply data row formatting
            for (Cell cell : dataRow) {
                cell.setCellStyle(dataRowStyle);
            }
        }

        // Auto-size columns
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            sheet.autoSizeColumn(i);
        }

        return workbook;
    }


    public static Workbook generateDepreciationReport(List<Depreciation> depreciationList) {
        // Create a new workbook
        Workbook workbook = new XSSFWorkbook();

        // Create a sheet
        Sheet sheet = workbook.createSheet("Depreciation Report");

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Asset ID");
        headerRow.createCell(1).setCellValue("Beggining Value");
        headerRow.createCell(2).setCellValue("Endyear Value");
        // Add more columns as needed

        // Populate data rows
        int rowIndex = 1;
        for (Depreciation depreciation : depreciationList) {
            Row dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(depreciation.getAssetId());
            dataRow.createCell(1).setCellValue(depreciation.getBegginingValue().toString());
            dataRow.createCell(2).setCellValue(depreciation.getEndyearValue());
            // Set values for additional columns
        }

        // Auto-size columns
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            sheet.autoSizeColumn(i);
        }

        return workbook;
    }


    public static Workbook generateMaintenanceReport(List<Maintenance> maintenanceList) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Maintenance Report");

        // Apply sheet formatting
        sheet.setFitToPage(true);
        sheet.setHorizontallyCenter(true);

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Maintainer");
        headerRow.createCell(1).setCellValue("Maintenance Date");
        headerRow.createCell(2).setCellValue("Next Maintenance Date");
        headerRow.createCell(3).setCellValue("Email");
        headerRow.createCell(4).setCellValue("Frequency");
        // Add more columns as needed

        // Apply header row formatting
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        for (Cell cell : headerRow) {
            cell.setCellStyle(headerStyle);
        }

        int rowIndex = 1;
        CellStyle dataRowStyle = workbook.createCellStyle();
        dataRowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Maintenance maintenance : maintenanceList) {
            Row dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(maintenance.getMaintener());

            Cell maintenanceDateCell = dataRow.createCell(1);
            maintenanceDateCell.setCellValue(
                    LocalDate.ofInstant(maintenance.getMaintDate().toInstant(), ZoneId.systemDefault()).format(dateFormatter)
            );

            Cell nextMaintenanceDateCell = dataRow.createCell(2);
            nextMaintenanceDateCell.setCellValue(
                    LocalDate.ofInstant(maintenance.getNextMaintDate().toInstant(), ZoneId.systemDefault()).format(dateFormatter)
            );

            dataRow.createCell(3).setCellValue(maintenance.getEmail());
            dataRow.createCell(4).setCellValue(maintenance.getFreequency());
            // Set values for additional columns

            // Apply data row formatting
            for (Cell cell : dataRow) {
                cell.setCellStyle(dataRowStyle);
            }
        }

        // Auto-size columns
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            sheet.autoSizeColumn(i);
        }

        return workbook;
    }

    public static Workbook generateInsuranceReport(List<Insurance> insuranceList) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Insurance Report");

        // Apply sheet formatting
        sheet.setFitToPage(true);
        sheet.setHorizontallyCenter(true);

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Insurance Company");
        headerRow.createCell(1).setCellValue("Policy Number");
        headerRow.createCell(2).setCellValue("Start Date");
        headerRow.createCell(3).setCellValue("End Date");
        headerRow.createCell(4).setCellValue("Cost");
        headerRow.createCell(5).setCellValue("Description");
        // Add more columns as needed

        // Apply header row formatting
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        for (Cell cell : headerRow) {
            cell.setCellStyle(headerStyle);
        }

        int rowIndex = 1;
        CellStyle dataRowStyle = workbook.createCellStyle();
        dataRowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Insurance insurance : insuranceList) {
            Row dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(insurance.getInsurer());
            dataRow.createCell(1).setCellValue(insurance.getPolicyNumber());

            Cell startDateCell = dataRow.createCell(2);
            startDateCell.setCellValue(
                    LocalDate.ofInstant(insurance.getStartDate().toInstant(), ZoneId.systemDefault()).format(dateFormatter)
            );

            Cell endDateCell = dataRow.createCell(3);
            endDateCell.setCellValue(
                    LocalDate.ofInstant(insurance.getEndDate().toInstant(), ZoneId.systemDefault()).format(dateFormatter)
            );
            dataRow.createCell(4).setCellValue(insurance.getCost());
            dataRow.createCell(5).setCellValue(insurance.getDescription());
            // Set values for additional columns

            // Apply data row formatting
            for (Cell cell : dataRow) {
                cell.setCellStyle(dataRowStyle);
            }
        }

        // Auto-size columns
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            sheet.autoSizeColumn(i);
        }

        return workbook;
    }

    public static Workbook generateWarrantyReport(List<Warranty> warrantyList) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Warranty Report");

        // Apply sheet formatting
        sheet.setFitToPage(true);
        sheet.setHorizontallyCenter(true);

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Warranty Provider");
        headerRow.createCell(1).setCellValue("Warranty Number");
        headerRow.createCell(2).setCellValue("Start Date");
        headerRow.createCell(3).setCellValue("End Date");
        headerRow.createCell(4).setCellValue("Description");
        // Add more columns as needed

        // Apply header row formatting
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        for (Cell cell : headerRow) {
            cell.setCellStyle(headerStyle);
        }

        int rowIndex = 1;
        CellStyle dataRowStyle = workbook.createCellStyle();
        dataRowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Warranty warranty : warrantyList) {
            Row dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(warranty.getProvider());
            dataRow.createCell(1).setCellValue(warranty.getWarrantNumber());

            Cell startDateCell = dataRow.createCell(2);
            startDateCell.setCellValue(
                    LocalDate.ofInstant(warranty.getStartDate().toInstant(), ZoneId.systemDefault()).format(dateFormatter)
            );

            Cell endDateCell = dataRow.createCell(3);
            endDateCell.setCellValue(
                    LocalDate.ofInstant(warranty.getEndDate().toInstant(), ZoneId.systemDefault()).format(dateFormatter)
            );

            dataRow.createCell(4).setCellValue(warranty.getDescription());
            // Set values for additional columns

            // Apply data row formatting
            for (Cell cell : dataRow) {
                cell.setCellStyle(dataRowStyle);
            }
        }

        // Auto-size columns
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            sheet.autoSizeColumn(i);
        }

        return workbook;
    }

    public static byte[] convertWorkbookToByteArray(Workbook workbook) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        return outputStream.toByteArray();
    }
}

