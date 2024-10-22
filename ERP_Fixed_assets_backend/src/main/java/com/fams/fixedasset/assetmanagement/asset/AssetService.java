package com.fams.fixedasset.assetmanagement.asset;

import com.fams.fixedasset.assetmanagement.Activitylogs.UseractivittyService;
import com.fams.fixedasset.assetmanagement.Approval.AssetApprovalRepository;
import com.fams.fixedasset.assetmanagement.Approval.AssetAproval;
import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.AssetCategory.CategoryRepository;
import com.fams.fixedasset.assetmanagement.AssetDisposal.AssetDisposal;
import com.fams.fixedasset.assetmanagement.AssetDisposal.AssetDisposalRepository;
import com.fams.fixedasset.assetmanagement.AssetREvaluation.Revaluation;
import com.fams.fixedasset.assetmanagement.AssetREvaluation.RevaluationRepository;
import com.fams.fixedasset.assetmanagement.Custodian.CustodianRepository;
import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnit;
import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnitRepository;
import com.fams.fixedasset.assetmanagement.Email.EmailSender;
import com.fams.fixedasset.assetmanagement.Email.Sender;
import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Insurance.InsuranceRepository;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByCategory;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByDepartment;
import com.fams.fixedasset.assetmanagement.Location.Location;
import com.fams.fixedasset.assetmanagement.Location.LocationRepository;
import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import com.fams.fixedasset.assetmanagement.Maintenance.MantainanceRepository;
//import com.fams.fixedasset.assetmanagement.Requests.Revaluation;
import com.fams.fixedasset.assetmanagement.Response.Response;
import com.fams.fixedasset.assetmanagement.Transfer.Transfer;
import com.fams.fixedasset.assetmanagement.Transfer.TransferRepository;
import com.fams.fixedasset.assetmanagement.Utils.CONSTANTS;
import com.fams.fixedasset.assetmanagement.VendorDetails.Vendor;
import com.fams.fixedasset.assetmanagement.VendorDetails.VendorRepository;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.Warranty.WarrantyRepository;
import com.fams.fixedasset.assetmanagement.Workorder.WorkOrderRepository;
import com.fams.fixedasset.assetmanagement.Workorder.Workorder;
import com.fams.fixedasset.assetmanagement.WriteOff.WriteOff;
import com.fams.fixedasset.assetmanagement.WriteOff.WriteOffRepository;
import com.fams.fixedasset.assetmanagement.codegenerator.CodeGen;


import com.fams.fixedasset.assetmanagement.codegenerator.ParameterService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class AssetService {
    @Autowired
    private Assetrepository assetrepository;
    @Autowired
    private AssetDisposalRepository assetDisposalRepository;
    @Autowired
    private RevaluationRepository revaluationRepository;

    @Autowired
    private WriteOffRepository writeOffRepository;

    @Autowired
    private VendorRepository vendorRepository;


    @Autowired
    private AssetApprovalRepository assetApprovalRepository;

    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    private WarrantyRepository warrantyRepository;

    @Autowired
    private MantainanceRepository mantainanceRepository;

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private UseractivittyService useractivittyService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private EmailSender emailSender;
    @Autowired
    private CodeGen codeGen;
    @Autowired
    private ParameterService parameterService;
    @Autowired
    private CustodianRepository custodianRepository;
    @Autowired
    private Sender sender;

    @Autowired
    private LocationRepository locationRepository;


    @Autowired
    private DepartmentUnitRepository departmentUnitRepository;


    private final static Logger logger = LoggerFactory.getLogger(AssetService.class);


//  public Asset newAsset(Asset asset) {
//
//
//
//    asset.setPostedTime(new Date());
//    asset.setDeletedFlag(false);
//    asset.setStatus(CONSTANTS.Not_Verified);
//
//    //    To pending request table
//    System.out.println("Asset to be added is "+ asset);
//      log.info("Adding to pending request table");
//    System.out.println("Inserting into pending approval table");
//      AssetAproval assetAproval=new AssetAproval();
//      assetAproval.setAsset_name(asset.getAsset_name());
//    System.out.println("Asset Name"+ asset.getAsset_name());
//
//      assetAproval.setCost(asset.getCost());
//      assetAproval.setDateAcquired(asset.getAcquisition_date());
//      assetAproval.setCustodian(asset.getCustodian());
//      Long category_ID= asset.getCategory_fk();
//      Category category = categoryRepository.getCategoryByid(category_ID);
//      assetAproval.setAssetCategory(category.getCategoryName());
//      Long location_ID = asset.getLocation_fk();
//      Location location = locationRepository.getLocationByid(location_ID);
//
//      assetAproval.setLocation(location.getWard());
//      assetAproval.setAction(CONSTANTS.NEW_ASSET);
//      assetAproval.setStatus(CONSTANTS.Not_Verified);
//
//      //generating assetCode
//
//
//      asset.setCategory(category.getCategoryName());
//      asset.setLocation(location.getWard());
//      DepartmentUnit departmentUnit = departmentUnitRepository.getUnitById(asset.getDepartment_unit_fk());
//      asset.setDepartment_unit(departmentUnit.getDepartmentName());
//
//      String final_code = parameterService.testEndpoint(asset).toString();
//      System.out.println("My final code is ::" + final_code);
//      asset.setAssetCode(final_code);
//      assetAproval.setAssetCode(asset.getAssetCode());
//    System.out.println("Request pending is "+ assetAproval);
//
//   Category category1=categoryRepository.getCategoryByid(asset.getCategory_fk());
//      assetApprovalRepository.save(assetAproval);
//
//
//
//      //logging
////      String action =  "Addition of new asset";
////     useractivittyService.newActivity(request,action);
//
//
//
//    //String subject = "Addition on new asset";
////    String mailto = custodianRepository.getemail(asset.getCustodian());
//    //String messagebody= "New asset name: " + asset.getAsset_name() + " has been added to the system";
////        emailSender.sendStatements(subject,messageody);
//      //sender.sender(subject,messagebody);
//
//      return assetrepository.save(asset);
//  }

    public Asset newAsset(Asset asset) {
        try {
            asset.setPostedTime(new Date());
            asset.setDeletedFlag(false);
            asset.setStatus(CONSTANTS.Not_Verified);

            log.info("Adding asset to the pending request table");

            AssetAproval assetApproval = new AssetAproval();
            assetApproval.setAsset_name(asset.getAsset_name());
            assetApproval.setCost(asset.getCost());
            assetApproval.setDateAcquired(asset.getAcquisition_date());
            assetApproval.setCustodian(asset.getCustodian());

            Long category_ID = asset.getCategory_fk();
            Category category = categoryRepository.getCategoryByid(category_ID);
            assetApproval.setAssetCategory(category.getCategoryName());

            Long location_ID = asset.getLocation_fk();
            Location location = locationRepository.getLocationByid(location_ID);
            assetApproval.setLocation(location.getWard());
            assetApproval.setAction(CONSTANTS.NEW_ASSET);
            assetApproval.setStatus(CONSTANTS.Not_Verified);

            asset.setCategory(category.getCategoryName());
            asset.setLocation(location.getWard());

            DepartmentUnit departmentUnit = departmentUnitRepository.getUnitById(asset.getDepartment_unit_fk());
            asset.setDepartment_unit(departmentUnit.getDepartmentName());

            String final_code = parameterService.testEndpoint(asset).toString();
            asset.setAssetCode(final_code);
            assetApproval.setAssetCode(asset.getAssetCode());

            assetApprovalRepository.save(assetApproval);

            // Logging
            // String action = "Addition of new asset";
            // useractivittyService.newActivity(request, action);

            // String subject = "Addition of new asset";
            // String mailto = custodianRepository.getemail(asset.getCustodian());
            // String messageBody = "New asset name: " + asset.getAsset_name() + " has been added to the system";
            // emailSender.sendStatements(subject, messageBody);
            // sender.sender(subject, messageBody);

            return assetrepository.save(asset);
        } catch (Exception e) {
            log.error("Error adding asset: " + e.getMessage());
            // Handle the exception, return an appropriate response, or take recovery actions

            return null; // or return a default value
        }
    }


    public List<Asset> listUndeletedAssets(HttpServletRequest request) {


        assetrepository.findByDeletedFlag(false);
        assetrepository.findByisActive(CONSTANTS.ACTIVE);
        return assetrepository.findByStatus(CONSTANTS.Verified);
    }

    public List<Asset> listdeletedAssets() {
//        return assetrepository.findByDeletedFlag(CONSTANTS.NO_FLAG);
        return assetrepository.findByDeletedFlag(true);
    }

    public List<Asset> inactiveAssets() {
        return assetrepository.findByisActive(CONSTANTS.INACTIVE);
    }

    public Asset asset_details(Long id) {
        return assetrepository.getAssetByid(id);
    }


    public void deleteAsset(Long id) {
        Asset asset = assetrepository.getById(id);
        System.out.println(asset.getAsset_name() + " has been deleted!!");
        asset.setDeletedFlag(true);
        assetrepository.save(asset);

        log.info("Asset has been deleted successfully");
    }

    public Asset updateAssetInformation(Asset asset, HttpServletRequest request) {
        asset.setStatus(CONSTANTS.Not_Verified);
        asset.setModifiedTime(new Date());
        asset.setDeletedFlag(false);

        AssetAproval assetAproval = new AssetAproval();
        assetAproval.setAsset_name(asset.getAsset_name());
        assetAproval.setAssetCode(asset.getAssetCode());
//        System.out.println("new value is " + revaluation.getAssetNewValue());
        assetAproval.setCost(asset.getCost());
        assetAproval.setAsset_Value(null);
        assetAproval.setDateAcquired(asset.getAcquisition_date());
        assetAproval.setCustodian(asset.getCustodian());
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        assetAproval.setAssetCategory(category.getCategoryName());
        Long location_ID = asset.getLocation_fk();
        Location location = locationRepository.getLocationByid(location_ID);
        assetAproval.setLocation(location.getWard());
        assetAproval.setAction(CONSTANTS.ASSET_UPDATE);
        assetAproval.setStatus(asset.getStatus());
        assetApprovalRepository.save(assetAproval);

//      Logging
        log.info("Update of an asset  " + asset.getAsset_name());


        String subject = "Asset Update";
        String mailto = custodianRepository.getemail(asset.getCustodian());
        String messagebody = "Asset name: " + asset.getAsset_name() + " has been updated";
        sender.sender(subject, messagebody);
        return assetrepository.save(asset);
    }

    public Revaluation asset_revaluate(Long id, Revaluation revaluation, HttpServletRequest request) {
        revaluation.setStatus(CONSTANTS.Not_Verified);
        Asset asset = assetrepository.getAssetByid(id);
        AssetAproval assetAproval = new AssetAproval();
        assetAproval.setAsset_name(asset.getAsset_name());
        assetAproval.setAssetCode(asset.getAssetCode());
        System.out.println("new value is " + revaluation.getAssetNewValue());
        assetAproval.setCost(asset.getCost());
        assetAproval.setAsset_Value(revaluation.getAssetNewValue());
        System.out.println("Asset approval asset value:: " + assetAproval.getAsset_Value());
        assetAproval.setDateAcquired(asset.getAcquisition_date());
        assetAproval.setCustodian(asset.getCustodian());
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        assetAproval.setAssetCategory(category.getCategoryName());
        Long location_ID = asset.getLocation_fk();
        Location location = locationRepository.getLocationByid(location_ID);
        assetAproval.setLocation(location.getWard());
        assetAproval.setAction(CONSTANTS.REVALUATION);
        assetAproval.setStatus(revaluation.getStatus());
        assetApprovalRepository.save(assetAproval);

        //Logging

        String subject = "Revaluation on new asset";
        String messagebody = "Asset name: " + asset.getAsset_name() + " has been revaluated";
        sender.sender(subject, messagebody);
        return revaluationRepository.save(revaluation);
    }

    public void revaluationApproval(Long id, Double cost) {
        Asset asset = assetrepository.getAssetByid(id);
//        Revaluation revaluation = new Revaluation();
//        revaluation.getId();
        asset.setCost(cost);
        assetrepository.save(asset);

    }


    public Transfer tansferasset(Long id, Transfer transfer, HttpServletRequest request) {

        transfer.setStatus(CONSTANTS.Not_Verified);
        Asset asset = assetrepository.getAssetByid(id);
        AssetAproval assetAproval = new AssetAproval();
        assetAproval.setAsset_name(asset.getAsset_name());
        assetAproval.setAssetCode(asset.getAssetCode());
        assetAproval.setCost(asset.getCost());
        assetAproval.setAsset_Value(null);
        assetAproval.setDateAcquired(asset.getAcquisition_date());
        assetAproval.setCustodian(asset.getCustodian());
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        assetAproval.setAssetCategory(category.getCategoryName());
        Long location_ID = asset.getLocation_fk();
        Location location = locationRepository.getLocationByid(location_ID);
        assetAproval.setLocation(location.getWard());
        assetAproval.setAction(CONSTANTS.TRANSFER);
        assetAproval.setStatus(transfer.getStatus());
        transfer.setAssetCode(asset.getAssetCode());
        assetApprovalRepository.save(assetAproval);

        //Logging
//send notification
        String subject = "Transfer on new asset";
        Long departmentUnit_Id = asset.getDepartment_unit_fk();
        DepartmentUnit departmentUnit = departmentUnitRepository.getUnitById(departmentUnit_Id);

        String messagebody = "Asset name: " + asset.getAsset_name() + " has been Tranfered from " + departmentUnit.getDepartmentName() + "department unit to " + transfer.getDepartmentName() + " department unit ";
        sender.sender(subject, messagebody);

        return transferRepository.save(transfer);
    }

    public void excellimport(MultipartFile file) throws IOException {
        Excellimports excellimports = new Excellimports();

        List<Asset> assets = excellimports.excelToAssets(file.getInputStream());
        assetrepository.saveAll(assets);
        List<AssetAproval> assetAprovalList = new ArrayList<>();
        for (Asset asset : assets) {
            AssetAproval assetAproval = new AssetAproval();
            assetAproval.setAsset_name(asset.getAsset_name());
            assetAproval.setAssetCode(asset.getAssetCode());
            assetAproval.setCost(asset.getCost());
            assetAproval.setAsset_Value(null);
            assetAproval.setDateAcquired(asset.getAcquisition_date());
            assetAproval.setCustodian(asset.getCustodian());
            Long category_ID = asset.getCategory_fk();
            Category category = categoryRepository.getCategoryByid(category_ID);
            assetAproval.setAssetCategory(category.getCategoryName());
            Long location_ID = asset.getLocation_fk();
            Location location = locationRepository.getLocationByid(location_ID);
            assetAproval.setLocation(location.getWard());
            assetAproval.setAction(CONSTANTS.NEW_ASSET);
            assetAproval.setStatus(asset.getStatus());
//                assetApprovalRepository.save(assetAproval);
            assetAprovalList.add(assetAproval);


        }
        assetApprovalRepository.saveAll(assetAprovalList);
        log.info("New stock from excel added");
        String subject = "New asset stock addition";
        String messagebody = "New stock has been added to the system via excel";
        sender.sender(subject, messagebody);

        //        Logging
    }


    public AssetDisposal assetDisposing(Long id, AssetDisposal assetDisposal) {
        assetDisposal.setStatus(CONSTANTS.Not_Verified);
        Asset asset = assetrepository.getAssetByid(id);
        AssetAproval assetAproval = new AssetAproval();
        assetAproval.setAsset_name(asset.getAsset_name());
        assetAproval.setAssetCode(asset.getAssetCode());
        assetAproval.setCost(asset.getCost());
        assetAproval.setAsset_Value(assetDisposal.getDisposalValue());
        assetAproval.setDateAcquired(asset.getAcquisition_date());
        assetAproval.setCustodian(asset.getCustodian());
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        assetAproval.setAssetCategory(category.getCategoryName());
        Long location_ID = asset.getLocation_fk();
        Location location = locationRepository.getLocationByid(location_ID);
        assetAproval.setLocation(location.getWard());
        assetAproval.setAction(CONSTANTS.DISPOSAL);
        assetAproval.setStatus(assetDisposal.getStatus());
        Double assetCost = asset.getCost();
        Double profit = assetCost - assetDisposal.getDisposalValue();
        if (profit > 0) {
            assetDisposal.setProfit_OR_loss(CONSTANTS.PROFIT);
            assetDisposal.setAmount(profit);
            assetDisposal.setAssetCost(asset.getCost());

        } else if (profit < 0) {
            assetDisposal.setProfit_OR_loss(CONSTANTS.LOSS);
            assetDisposal.setAmount(profit);
            assetDisposal.setAssetCost(asset.getCost());
        }
        assetApprovalRepository.save(assetAproval);


        //        Logging
        String subject = "Asset Disposal";
        String messagebody = "Asset name: " + asset.getAsset_name() + " has been disposed";
        sender.sender(subject, messagebody);
        return assetDisposalRepository.save(assetDisposal);

    }

    public List<AssetDisposal> getdisposalrecords() {
        assetDisposalRepository.findByAssetState(CONSTANTS.INACTIVE);
        return assetDisposalRepository.findByStatus(CONSTANTS.Verified);
    }

    public WriteOff assetWriteoff(Long id, WriteOff writeOff) {
        writeOff.setStatus(CONSTANTS.Not_Verified);
        Asset asset = assetrepository.getAssetByid(id);
        AssetAproval assetAproval = new AssetAproval();
        assetAproval.setAsset_name(asset.getAsset_name());
        assetAproval.setAssetCode(asset.getAssetCode());
        assetAproval.setCost(asset.getCost());
        assetAproval.setAsset_Value(writeOff.getScrap_value());
        assetAproval.setDateAcquired(asset.getAcquisition_date());
        assetAproval.setCustodian(asset.getCustodian());
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        assetAproval.setAssetCategory(category.getCategoryName());
        Long location_ID = asset.getLocation_fk();
        Location location = locationRepository.getLocationByid(location_ID);
        assetAproval.setLocation(location.getWard());
        assetAproval.setAction(CONSTANTS.WRITE_OFF);
        assetAproval.setStatus(writeOff.getStatus());
        assetApprovalRepository.save(assetAproval);


        // Logging

        String subject = "Asset Disposal";
        String messagebody = "Asset name: " + asset.getAsset_name() + " has been Written-off";
        sender.sender(subject, messagebody);
        log.info("write-of of asset " + asset.getAsset_name());

        return writeOffRepository.save(writeOff);
    }

    public Vendor newVendor(Vendor vendor, Long id) {
        Asset asset = assetrepository.getAssetByid(id);
        vendor.setAsset(asset);
        log.info("Addition of new vendor." + vendor.getVendorName());
        return vendorRepository.save(vendor);
    }

    public Vendor updateVendor(Vendor vendor, Long id) {
        Asset asset = assetrepository.getAssetByid(id);
        vendor.setAsset(asset);
        return vendorRepository.save(vendor);
    }

    public List<Vendor> getVendor(Long id) {

        return vendorRepository.getVendor(id);

    }

    public void deleteVendor(Long id) {

        vendorRepository.deleteById(id);
    }

    //  new warrant
    public Warranty newwaranty(Warranty warranty, Long id) {

        Asset asset = assetrepository.getAssetByid(id);

        warranty.setAsset(asset);
        log.info("warranty added for  assset: " + asset.getAsset_name());


        return warrantyRepository.save(warranty);
    }

    //update warranty
    public Warranty updateWarranty(Warranty warranty, Long id) {
        System.out.println(warranty.getAsset());
        Asset asset = assetrepository.getAssetByid(id);
        warranty.setAsset(asset);
        return warrantyRepository.save(warranty);
    }

    //get warrants
    public List<Warranty> getWarranty() {
        return warrantyRepository.findAll();
    }

    public void deleteWarratnty(Long id) {
        warrantyRepository.deleteById(id);
    }

    public Response newMaintenance(Maintenance maintenance, Long id) throws ParseException, GeneralSecurityException {
        String frequency = maintenance.getFreequency();
        Asset asset = assetrepository.getAssetByid(id);
        maintenance.setAsset(asset);
        maintenance.setStatus(CONSTANTS.ACTIVE);

        if (frequency.equalsIgnoreCase("Weekly")) {
            maintenance.setDays(7);
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            maintenance.setDays(28);
        } else if (frequency.equalsIgnoreCase("Annually")) {
            maintenance.setDays(365);
        }

        Integer oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        Date today = new Date();
        Date maintenanceDate = maintenance.getMaintDate();
        Date firstDate = today;
        Date secondDate = maintenanceDate;

        String subject = "Maintenance Schedule Reminder";
        String custodianEmail = custodianRepository.getemail(asset.getCustodian());
        String maintainerEmail = maintenance.getEmail();

        String pattern = "dd-MM-yyyy";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);

        String messageBody = "Dear " + maintenance.getMaintener() + ", maintenance for asset name: " + asset.getAsset_name() + " has been scheduled for " + formatter.format(maintenance.getMaintDate()) + ".";
        sender.emailsender(maintainerEmail, subject, messageBody);

        long diffInMillies = Math.abs(secondDate.getTime() - firstDate.getTime());
        long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        maintenance.setRemainingDays(diff);

        if (diff == 0) {
            String messageBody1 = "Dear " + maintenance.getMaintener() + ", this is to remind you that maintenance for asset name: " + asset.getAsset_name() + " is scheduled for today " + formatter.format(new Date()) + ".";
            sender.emailsender(maintainerEmail, subject, messageBody1);
            maintenance.setMaintDate(maintenance.getNextMaintDate());
        }

        mantainanceRepository.save(maintenance);
        mantainanceRepository.updateMaintenance(id);

        return new Response("Maintenance added successfully");
    }

    public List<Maintenance> getMaintenance(Long id) {
        return mantainanceRepository.getMaintenance(id);
    }

    public Maintenance updateMaintance(Maintenance maintenance) {
//      Maintenance maintenance = new Maintenance();
        return mantainanceRepository.save(maintenance);
    }

    public void deletMaintenance(Long id) {
//      mantainanceRepository.getMaintenanceById(id);
        mantainanceRepository.deleteById(id);
    }

    public Workorder newWorkorder(Workorder workorder, Long id) {
        Asset asset = assetrepository.getAssetByid(id);
        workorder.setAsset(asset);
        return workOrderRepository.save(workorder);
    }

    public Workorder updateworkorder(Long id, Workorder workorder) {
        Asset asset = assetrepository.getAssetByid(id);
        workorder.setAsset(asset);
        return workOrderRepository.save(workorder);
    }

    public List<Workorder> getWorkorder() {
        return workOrderRepository.findAll();
    }

    public void deletWorkorder(Long id) {
        workOrderRepository.deleteById(id);
    }

    public Insurance newInsurance(Insurance insurance, Long id) {
        Asset asset = assetrepository.getAssetByid(id);
        insurance.setAsset(asset);
        return insuranceRepository.save(insurance);
    }

    public Insurance updateinsuranace(Long id, Insurance insurance) {
        Asset asset = assetrepository.getAssetByid(id);
        insurance.setAsset(asset);
        return insuranceRepository.save(insurance);
    }

    public List<Insurance> getInsurance() {
        return insuranceRepository.findAll();
    }

    public void deleteInsurance(Long id) {
        insuranceRepository.deleteById(id);
    }

    public List<AssetAproval> getRequests() {

        return assetApprovalRepository.findRequests();

    }

    public AssetAproval getrequestByid(Long id) {
        return assetApprovalRepository.getRequestById(id);
    }

    public List<Asset> finddByCategory(String category) {
        return assetrepository.findByCategory(category);
    }

    public List<?> getcategorycount() {
        List<Category> categories = categoryRepository.findAll();
        List<?> data = assetrepository.valueByCategory();
        System.out.println("TOTAL ASSETS is ::" + assetrepository.getAssetCount());
//      Long count = Long.valueOf(0);
        for (Category category : categories) {
            List<Asset> assets = assetrepository.findByCategory(category.getCategoryName());
            for (Asset asset : assets) {
                System.out.println("Asset value is " + asset.getCost());
                System.out.println("Asset value is " + assetrepository.getTotalCost());

            }
            System.out.println(category.getCategoryName() + ":: " + assetrepository.findByCategory(category.getCategoryName()).stream().count());
//      System.out.println("");
//      System.out.println("Total assets in" + category.getCategoryName()+  "::"+ assetrepository.findByCategory(category.getCategoryName()).stream().count());

//     count= assetrepository.findByCategory(category.getCategoryName()).stream().count();
//          return category.getCategoryName();

        }
        return data;
    }

    public List<AssetsByCategory> getAssetByCategory() {
        return assetrepository.getCategoryAssets();
    }

    public List<AssetsByDepartment> getAssetsByDepartment() {
        return assetrepository.getDepartmentAssets();
    }


    public List<Asset> findByDepartment(String department) {
        return assetrepository.findByDepartment(department);
    }


    public void assetApproval(Long id) {
        AssetAproval assetApproval = assetApprovalRepository.getById(id);
        System.out.println("Asset Approval item: " + assetApproval);

        if (assetApproval.getAction().equalsIgnoreCase(CONSTANTS.NEW_ASSET)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetApproval.getAssetCode());
            System.out.println("This asset is: " + asset);
            asset.setStatus(CONSTANTS.Verified);
            asset.setIsActive(CONSTANTS.ACTIVE);
            System.out.println("Asset to be approved: " + asset);
            assetApproval.setStatus(asset.getStatus());

            assetrepository.save(asset);
            assetApprovalRepository.save(assetApproval);
        } else if (assetApproval.getAction().equalsIgnoreCase(CONSTANTS.REVALUATION)) {
            Revaluation revaluation = revaluationRepository.findByAssetCode(assetApproval.getAssetCode());
            Asset asset = assetrepository.getAssetByAssetCode(assetApproval.getAssetCode());
            System.out.println("Revaluation value is: " + revaluation.getAssetNewValue());
            //System.out.println("Asset approval value is: " + assetApproval.getAssetValue());
            asset.setCost(asset.getCost());
            asset.setNewValue(revaluation.getAssetNewValue());
            revaluation.setStatus(CONSTANTS.Verified);
            assetApproval.setStatus(revaluation.getStatus());
            assetApprovalRepository.save(assetApproval);
            assetrepository.save(asset);
            revaluationRepository.save(revaluation);
        } else if (assetApproval.getAction().equalsIgnoreCase(CONSTANTS.TRANSFER)) {
            Transfer transfer = transferRepository.getTransferByAssetCode(assetApproval.getAssetCode());
            Asset asset = assetrepository.getAssetByAssetCode(assetApproval.getAssetCode());
            DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(transfer.getDepartmentName());
            asset.setDepartment_unit_fk(departmentUnit.getId());
            assetrepository.save(asset);
            transfer.setStatus(CONSTANTS.Verified);
            transferRepository.save(transfer);
            assetApproval.setStatus(transfer.getStatus());
            assetApprovalRepository.save(assetApproval);
        } else if (assetApproval.getAction().equalsIgnoreCase(CONSTANTS.DISPOSAL)) {
            AssetDisposal assetDisposal = assetDisposalRepository.getDisposalByAssetCode(assetApproval.getAssetCode());
            Asset asset = assetrepository.getAssetByAssetCode(assetApproval.getAssetCode());
            asset.setNewValue(assetApproval.getAsset_Value());
            asset.setIsActive(CONSTANTS.INACTIVE);
            asset.setStatus(null);
            asset.setDeletedFlag(null);
            assetDisposal.setAsset_name(assetDisposal.getAsset_name());
            assetDisposal.setStatus(CONSTANTS.Verified);
            assetDisposal.setDateAdded(new Date());
            assetApproval.setStatus(assetDisposal.getStatus());

            assetDisposal.setAssetState(asset.getIsActive());
            System.out.println("Asset Disposal: " + assetDisposal);
            assetrepository.save(asset);
            assetApprovalRepository.save(assetApproval);
            assetDisposalRepository.save(assetDisposal);
        } else if (assetApproval.getAction().equalsIgnoreCase(CONSTANTS.ASSET_UPDATE)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetApproval.getAssetCode());
            asset.setStatus(CONSTANTS.Verified);
            assetApproval.setStatus(asset.getStatus());
            assetApprovalRepository.save(assetApproval);
            assetrepository.save(asset);
        } else if (assetApproval.getAction().equalsIgnoreCase(CONSTANTS.WRITE_OFF)) {
            WriteOff writeOff = writeOffRepository.getWriteOffByAssetCode(assetApproval.getAssetCode());
            Asset asset = assetrepository.getAssetByAssetCode(assetApproval.getAssetCode());
            AssetDisposal assetDisposal = new AssetDisposal();

            asset.setIsActive(CONSTANTS.INACTIVE);
            asset.setStatus(null);
            asset.setDeletedFlag(null);
            asset.setNewValue(writeOff.getScrap_value());
            writeOff.setStatus(CONSTANTS.Verified);
            assetApproval.setStatus(writeOff.getStatus());

            assetDisposal.setAssetCode(writeOff.getAssetCode());
            assetDisposal.setAsset_name(writeOff.getAssetName());
            assetDisposal.setAssetState(asset.getIsActive());
            assetDisposal.setDateAdded(new Date());
            assetDisposal.setAssetCost(asset.getCost());
            assetDisposal.setDisposalValue(writeOff.getScrap_value());

            Double assetCost = asset.getCost();
            Double profit = assetCost - assetDisposal.getDisposalValue();
            if (profit > 0) {
                assetDisposal.setProfit_OR_loss(CONSTANTS.PROFIT);
                assetDisposal.setAmount(profit);
            } else if (profit <= 0) {
                assetDisposal.setProfit_OR_loss(CONSTANTS.LOSS);
                assetDisposal.setAmount(profit);
            }

            assetrepository.save(asset);
            writeOffRepository.save(writeOff);
            assetDisposalRepository.save(assetDisposal);
            assetApprovalRepository.save(assetApproval);
        }
    }


    public void actionrejection(Long id, String reason) {
        AssetAproval assetAproval = assetApprovalRepository.getById(id);


        if (assetAproval.getAction().equalsIgnoreCase(CONSTANTS.NEW_ASSET)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetAproval.getAssetCode());
            asset.setStatus(CONSTANTS.REJECTED);
            asset.setIsActive(CONSTANTS.INACTIVE);
            assetAproval.setStatus(asset.getStatus());
            assetAproval.setReason(reason);
            assetrepository.save(asset);
            assetApprovalRepository.save(assetAproval);
        } else if (assetAproval.getAction().equalsIgnoreCase(CONSTANTS.ASSET_UPDATE)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetAproval.getAssetCode());
            asset.setStatus(CONSTANTS.REJECTED);
            assetAproval.setStatus(asset.getStatus());
            assetAproval.setReason(reason);
            assetApprovalRepository.save(assetAproval);
            assetrepository.save(asset);

        } else if (assetAproval.getAction().equalsIgnoreCase(CONSTANTS.REVALUATION)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetAproval.getAssetCode());
            Revaluation revaluation = revaluationRepository.findByAssetCode(assetAproval.getAssetCode());
            asset.setCost(asset.getCost());
            asset.setNewValue(null);
            revaluation.setStatus(CONSTANTS.REJECTED);
            assetAproval.setStatus(revaluation.getStatus());
            assetAproval.setReason(reason);
            assetApprovalRepository.save(assetAproval);
            assetrepository.save(asset);
            revaluationRepository.save(revaluation);

        } else if (assetAproval.getAction().equalsIgnoreCase(CONSTANTS.TRANSFER)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetAproval.getAssetCode());
            Transfer transfer = transferRepository.getTransferByAssetCode(assetAproval.getAssetCode());
            DepartmentUnit departmentUnit = departmentUnitRepository.getDepUnitByDepartmentName(transfer.getDepartmentName());
            asset.setDepartment_unit_fk(departmentUnit.getId());
            transfer.setStatus(CONSTANTS.REJECTED);
            assetAproval.setStatus(transfer.getStatus());
            assetAproval.setReason(reason);
            assetrepository.save(asset);
            transferRepository.save(transfer);
            assetApprovalRepository.save(assetAproval);
        } else if (assetAproval.getAction().equalsIgnoreCase(CONSTANTS.DISPOSAL)) {
            Asset asset = assetrepository.getAssetByAssetCode(assetAproval.getAssetCode());
            AssetDisposal assetDisposal = assetDisposalRepository.getDisposalByAssetCode(assetAproval.getAssetCode());
            asset.setNewValue(null);
            asset.setIsActive(CONSTANTS.ACTIVE);
            assetDisposal.setStatus(CONSTANTS.REJECTED);
            assetDisposal.setDateAdded(new Date());
            assetAproval.setStatus(assetDisposal.getStatus());
            assetDisposal.setAssetState(asset.getIsActive());
            assetAproval.setReason(reason);
            assetrepository.save(asset);
            assetApprovalRepository.save(assetAproval);
            assetDisposalRepository.save(assetDisposal);

        } else if (assetAproval.getAction().equalsIgnoreCase(CONSTANTS.WRITE_OFF)) {
            WriteOff writeOff = writeOffRepository.getWriteOffByAssetCode(assetAproval.getAssetCode());
            Asset asset = assetrepository.getAssetByAssetCode(assetAproval.getAssetCode());
            asset.setIsActive(CONSTANTS.ACTIVE);
            asset.setNewValue(null);
            writeOff.setStatus(CONSTANTS.REJECTED);
            assetAproval.setStatus(writeOff.getStatus());
            assetAproval.setReason(reason);
            assetrepository.save(asset);
            writeOffRepository.save(writeOff);
            assetApprovalRepository.save(assetAproval);
        }

    }


}
