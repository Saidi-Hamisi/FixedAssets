package com.fams.fixedasset.assetmanagement.asset;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import com.fams.fixedasset.assetmanagement.Approval.AssetApprovalRepository;
import com.fams.fixedasset.assetmanagement.Approval.AssetAproval;
import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.AssetCategory.CategoryRepository;
import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnit;
import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnitRepository;
import com.fams.fixedasset.assetmanagement.Departments.Department;
import com.fams.fixedasset.assetmanagement.Departments.DepartmentRepository;
import com.fams.fixedasset.assetmanagement.Location.Location;
import com.fams.fixedasset.assetmanagement.Location.LocationRepository;
import com.fams.fixedasset.assetmanagement.Utils.CONSTANTS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;


public class Excellimports {
    @Autowired
    private static DepartmentRepository departmentRepository;

    @Autowired
    private static AssetApprovalRepository assetApprovalRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DepartmentUnitRepository departmentUnitRepository;




    private static Department department;



        public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//        static String[] HEADERs = { "Serial No.", "Size", "Name", "Cost","Date Acquired" ,"Depreciation Type" ,"Depreciation Rate" ,"Custodian" ,"Location","Remarks","Department"  };
        static String SHEET = "Land";
        public static boolean hasExcelFormat(MultipartFile file) {
            if (!TYPE.equals(file.getContentType())) {
                System.out.println("No file!!");
                return false;
            }
//            System.out.println("I got the file");
            return true;
        }


        public  List<Asset> excelToAssets (InputStream is){

            try {
                Workbook workbook = new XSSFWorkbook(is);
                Sheet sheet = workbook.getSheetAt(0);
                Sheet sheet1 = workbook.getSheetAt(1);
                Sheet sheet2 = workbook.getSheetAt(2);
                Sheet sheet3 = workbook.getSheetAt(3);
                Sheet sheet4 = workbook.getSheetAt(4);
                Sheet sheet5 = workbook.getSheetAt(5);
                Sheet sheet6 = workbook.getSheetAt(6);
                Sheet sheet7 = workbook.getSheetAt(7);
                Sheet sheet8 = workbook.getSheetAt(8);


                //LAND sheet
                Iterator<Row> rows = sheet.rowIterator();
                Row headerRow = rows.next();

                List<Asset> assets = new ArrayList<>();
                List<AssetAproval> assetAprovalList = new ArrayList<>();
                int rowNumber = 0;

                while(rows.hasNext()){
                    Row currentRow = rows.next();
                    //Skip header
                    if(rowNumber == 0){
                        rowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval=new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType()==CellType.STRING){
                                    asset.setLrno(currentCell.getStringCellValue());
                                }else if (currentCell.getCellType() == CellType.NUMERIC){
                                    asset.setLrno(String.valueOf(currentCell.getNumericCellValue()));
                                }
                                break;
                            case 1:
                                if (currentCell.getCellType() == CellType.STRING){
                                    asset.setSize(Long.valueOf(currentCell.getStringCellValue()));
                                }else if(currentCell.getCellType() == CellType.NUMERIC){
                                    asset.setSize((long) currentCell.getNumericCellValue());
                                }
                                break;
                            case 2:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setCost(currentCell.getNumericCellValue());
//                    System.out.println("Asset cost is " + asset.getCost());
                                break;
                            case 4:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                            System.out.println("sheet 1 " + asset.getAcquisition_date() );
                                break;
                            case  5:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 6:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 7:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 8:

                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 9:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 10:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
//                                System.out.println("Asset department unit is " + asset.get());
                                break;
                            default:
                                break;

                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);


                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    System.out.println("Lands:  "+ asset);
                    assets.add(asset);
//        System.out.println("assetAproval" + assetAproval);
//                    assetAprovalList.add(assetAproval);
                    System.out.println("Lands:  "+ assets);
                    if (!rows.hasNext())
                     break;
                }

                //Building sheet
                Iterator<Row> sheet1Rows = sheet1.iterator();
                Row sheet1HeaderRow = sheet1Rows.next();
                int sheet1RowNumber = 3;

                while (sheet1Rows.hasNext()){
                    Row currentRow = sheet1Rows.next();
                    //Skip header
                    if(sheet1RowNumber == 3){
                        sheet1RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
                    AssetAproval assetAproval= new AssetAproval();
                    int cellIndex = 0;
                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType()==CellType.NUMERIC){
                                    asset.setLrno(String.valueOf(currentCell.getNumericCellValue()));
                                }else {
                                    asset.setLrno(currentCell.getStringCellValue());
                                }
                System.out.println("Asset lr no " + asset.getLrno());
                                break;
                            case 1:
                                if(currentCell.getCellType() == CellType.NUMERIC){
                                    asset.setSize((long) currentCell.getNumericCellValue());
                                }else if(currentCell.getCellType() ==
                                        CellType.STRING){
                                    asset.setSize(Long.valueOf(currentCell.getStringCellValue()));
                                }
                                break;
                            case 2:
                                asset.setLocalAuthority(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 4:
                                asset.setCost(currentCell.getNumericCellValue());
                                break;
                            case  5:
                                System.out.println(currentCell.getCellType());
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                                System.out.println("sheet 2 Date : " + asset.getAcquisition_date() );
                                break;
                            case 6:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 7:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 8:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 9:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 10:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 11:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());

                                    break;
                            default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);




                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);
//                    assetAprovalList.add(assetAproval);
                }
                //Motor vehicle sheet
                Iterator<Row> sheet2Rows = sheet2.iterator();
                Row sheet2HeaderRow = sheet2Rows.next();
                int sheet2RowNumber = 2;

                while (sheet2Rows.hasNext()){
                    Row currentRow = sheet2Rows.next();
                    //Skip header
                    if(sheet2RowNumber == 2){
                        sheet2RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval = new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                asset.setRegNo(currentCell.getStringCellValue());
                                break;
                            case 1:
                                asset.setEngine_No(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setChasisNo(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setLocalAuthority(currentCell.getStringCellValue());
                                break;
                            case 4:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 5:
                                asset.setCost(currentCell.getNumericCellValue());
              System.out.println("Asset cost is "+ asset.getCost());
                                break;
                            case  6:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
              System.out.println("Asset date is "+ asset.getAcquisition_date());
                                break;
                            case 7:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 8:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());

                                break;
                            case 9:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 10:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 11:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 12:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                           default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);


                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);

                }

                //Computer
                Iterator<Row> sheet3Rows = sheet3.iterator();
                Row sheet3HeaderRow = sheet3Rows.next();
                int sheet3RowNumber = 2;

                while (sheet3Rows.hasNext()){
                    Row currentRow = sheet3Rows.next();

                    //Skip header
                    if(sheet3RowNumber == 2){
                        sheet3RowNumber++;
                        continue;
                    }
                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval= new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType()==CellType.NUMERIC){
                                    asset.setSerialNo(String.valueOf(currentCell.getNumericCellValue()));
                                }else{
                                    asset.setSerialNo(currentCell.getStringCellValue());
                                }
                                break;
                            case 1:
                                asset.setMake(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setModel(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 4:
                                    asset.setCost(currentCell.getNumericCellValue());
                                    System.out.println("computer cost " + asset.getCost());
                                break;
                            case  5:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
              System.out.println("Computer  Date is : "+ asset.getAcquisition_date());
                                break;
                            case 6:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 7:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 8:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 9:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 10:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 11:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                            default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);



                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);
//                    assetAprovalList.add(assetAproval);
                }


                //Computer_Accessories
                Iterator<Row> sheet4Rows = sheet4.iterator();
//                Row sheet4HeaderRow = sheet4Rows.next();
                int sheet4RowNumber = 2;

                while (sheet4Rows.hasNext()){
                    Row currentRow = sheet4Rows.next();

                    if(sheet4RowNumber == 2){
                        sheet4RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
                    AssetAproval assetAproval = new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType()==CellType.NUMERIC){
                                    asset.setSerialNo(String.valueOf(currentCell.getNumericCellValue()));
                                }else{
                                    asset.setSerialNo(currentCell.getStringCellValue());
                                }
                                break;
                            case 1:
                                asset.setMake(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setModel(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                System.out.println("computer Accessory Name is  " + asset.getAsset_name());
                                break;
                            case 4:
                                asset.setCost(currentCell.getNumericCellValue());
                                System.out.println("computer Accessory cost " + asset.getCost());
                                break;
                            case  5:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                                System.out.println("Computer  Date is : "+ asset.getAcquisition_date());
                                break;
                            case 6:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 7:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 8:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 9:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 10:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 11:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                            default:
                                break;
                        }

                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);



                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);
                    assetAprovalList.add(assetAproval);
                }


                //Furniture
                Iterator<Row> sheet5Rows = sheet5.iterator();
                Row sheet5HeaderRows = sheet5Rows.next();
                int sheet5RowNumber = 2;

                while (sheet5Rows.hasNext()){
                    Row currentRow = sheet5Rows.next();

                    if(sheet5RowNumber == 2){
                        sheet5RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval = new AssetAproval();

                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType() == CellType.NUMERIC){
                                    asset.setSerialNo(String.valueOf(currentCell.getNumericCellValue()));
                                }else if (currentCell.getCellType() == CellType.STRING){
                                    asset.setSerialNo(currentCell.getStringCellValue());
                                }
                                System.out.println("Furniture is" + asset.getSerialNo());
                                break;
                            case 1:
                                asset.setType(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setCost(currentCell.getNumericCellValue());
                                System.out.println("this Furniture cost is " + asset.getCost());
                                break;
                            case 4:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                                System.out.println("Furniture AC is : " + asset.getAcquisition_date() );
                                break;
                            case  5:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 6:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 7:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 8:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 9:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 10:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                            default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);


                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
//                    System.out.println("Asset Category is "+ asset.getCategory());
                    assets.add(asset);
//                    assetAprovalList.add(assetAproval);
                }

                //Equipement sheet
                Iterator<Row> sheet6Rows = sheet6.iterator();
                Row sheet6HeaderRow = sheet6Rows.next();
                int sheet6RowNumber = 2;

                while (sheet6Rows.hasNext()){
                    Row currentRow = sheet6Rows.next();

                    if(sheet6RowNumber == 2){
                        sheet6RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval =new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType() == CellType.NUMERIC){
                                    asset.setSerialNo(String.valueOf(currentCell.getNumericCellValue()));
                                }else if (currentCell.getCellType() == CellType.STRING){
                                asset.setSerialNo(currentCell.getStringCellValue());
                                }
                                break;
                            case 1:
                                asset.setType(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 3:
                                   asset.setCost(currentCell.getNumericCellValue());
                                System.out.println("Equipement cost" + asset.getCost());
                                break;
                            case 4:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                                System.out.println("Equipement date " + asset.getAcquisition_date());
                                break;
                            case  5:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 6:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 7:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 8:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 9:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 10:

                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                            default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);



                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);
//                    assetAprovalList.add(assetAproval);
                }

                //Current_Assets sheet
                Iterator<Row> sheet7Rows = sheet7.iterator();
                Row sheet7HeaderRow = sheet7Rows.next();
                int sheet7RowNumber = 2;

                while (sheet7Rows.hasNext()){
                    Row currentRow = sheet7Rows.next();

                    if(sheet7RowNumber == 2){
                        sheet7RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval = new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                asset.setType(currentCell.getStringCellValue());
//              System.out.println("sheet 8 sn is :" + asset.getSerialNo());
                                break;
                            case 1:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setCost(currentCell.getNumericCellValue());
                                break;
                            case 3:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                                break;
                            case  4:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 5:
                                asset.setDepreciation_rate((double) currentCell.getNumericCellValue());
                                System.out.println("sheet 8 " + asset.getDepreciation_rate());
                                break;
                            case 6:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 7:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 8:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 9:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                            default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);




                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);
//                    assetAprovalList.add(assetAproval);

                }
                //Biological_Assets
                Iterator<Row> sheet8Rows = sheet8.iterator();
                Row sheet8HeaderRow = sheet8Rows.next();
                int sheet8RowNumber = 2;

                while (sheet8Rows.hasNext()){
                    Row currentRow = sheet8Rows.next();

                    if(sheet8RowNumber == 2){
                        sheet8RowNumber++;
                        continue;
                    }

                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Asset asset = new Asset();
//                    AssetAproval assetAproval = new AssetAproval();
                    int cellIndex = 0;

                    while (cellsInRow.hasNext()){
                        Cell currentCell = cellsInRow.next();
                        switch (cellIndex){
                            case 0:
                                if(currentCell.getCellType() == CellType.NUMERIC){
                                    asset.setSerialNo(String.valueOf(currentCell.getNumericCellValue()));
                                }else if (currentCell.getCellType() == CellType.STRING){
                                    asset.setSerialNo(currentCell.getStringCellValue());
                                }
                                break;
                            case 1:
                                asset.setType(currentCell.getStringCellValue());
                                break;
                            case 2:
                                asset.setAsset_name(currentCell.getStringCellValue());
                                break;
                            case 3:
                                asset.setCost(currentCell.getNumericCellValue());
                                break;
                            case 4:
                                asset.setAcquisition_date(currentCell.getDateCellValue());
                                System.out.println("sheet 8 " + asset.getAcquisition_date() );
                                break;
                            case  5:
                                asset.setDepreciation_type(currentCell.getStringCellValue());
                                break;
                            case 6:
                                asset.setDepreciation_rate(currentCell.getNumericCellValue());
                                break;
                            case 7:
                                asset.setCustodian(currentCell.getStringCellValue());
                                break;
                            case 9:
                                Location location = locationRepository.getLocationByWard(currentCell.getStringCellValue());
                                asset.setLocation_fk(location.getId());
                                break;
                            case 10:
                                asset.setRemarks(currentCell.getStringCellValue());
                                break;
                            case 11:
                                DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(currentCell.getStringCellValue());
                                asset.setDepartment_unit_fk(departmentUnit.getId());
                                break;
                            default:
                                break;
                        }
                        cellIndex++;
                        asset.setPostedTime(new Date());
                        asset.setDeletedFlag(false);
                        asset.setStatus(CONSTANTS.Not_Verified);
                        asset.setIsActive(CONSTANTS.ACTIVE);

                    }
                    Category category = categoryRepository.getCategoryByCategoryName(sheet.getSheetName());
                    asset.setCategory_fk(category.getId());
                    assets.add(asset);

//                    assetApprovalRepository.saveAll(assetAprovalList);

                }
                workbook.close();
                return assets;
            }catch (IOException e){
                throw new RuntimeException("Fail to parse Excel file: "+e.getMessage());
            }
        }


}



