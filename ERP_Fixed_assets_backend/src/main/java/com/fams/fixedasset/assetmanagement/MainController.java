package com.fams.fixedasset.assetmanagement;


import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.AssetCategory.CategoryRepository;
import com.fams.fixedasset.assetmanagement.AssetDisposal.AssetDisposal;
import com.fams.fixedasset.assetmanagement.AssetREvaluation.Revaluation;
import com.fams.fixedasset.assetmanagement.FileUploads.FileInfo;
import com.fams.fixedasset.assetmanagement.FileUploads.FilesStorageServiceImpl;
import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import com.fams.fixedasset.assetmanagement.Maintenance.MantainanceRepository;
import com.fams.fixedasset.assetmanagement.Response.Response;
import com.fams.fixedasset.assetmanagement.Transfer.Transfer;
import com.fams.fixedasset.assetmanagement.VendorDetails.Vendor;
import com.fams.fixedasset.assetmanagement.VendorDetails.VendorRepository;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.Workorder.Workorder;
import com.fams.fixedasset.assetmanagement.WriteOff.WriteOff;
import com.fams.fixedasset.assetmanagement.asset.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;


@Slf4j
@CrossOrigin
@RestController
@RequestMapping(path = "api/assets")
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class MainController {
    @Autowired
    private AssetService assetService;
    @Autowired
    private FilesStorageServiceImpl filesStorageService;

    @Autowired
    private Assetrepository assetrepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private MantainanceRepository mantainanceRepository;
    //Get all assets

    @GetMapping(path = "assetList")
    public ResponseEntity<?> getAssets(HttpServletRequest request) {

        return ResponseEntity.ok().body(assetService.listUndeletedAssets(request));
    }

    //    inactive assets
    @GetMapping(path = "assets/inactive")
    public ResponseEntity<?> getInactiveAssets() {

        return ResponseEntity.ok().body(assetService.inactiveAssets());
    }
    //Add new Asset

    //@CrossOrigin
//    @PostMapping(path = "addAsset")
////    @PreAuthorize("hasRole('CLERK') or hasRole('ADMIN')")
//    public ResponseEntity<Response> addAsset(@RequestBody Asset asset) {
//        assetService.newAsset(asset);
//        log.info("New asset added successfully");
////        return ResponseEntity.ok().body(new Response("New Asset added Successfully"));
//        return ResponseEntity.status(HttpStatus.OK).body(new Response("New asset added successfully"));
//
//    }

    @PostMapping(path = "addAsset")
    public ResponseEntity<Response> addAsset(@RequestBody Asset asset) {
        try {
            assetService.newAsset(asset);
            log.info("New asset added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(new Response("New asset added successfully"));
        } catch (Exception e) {
            log.error("Error adding asset: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("Failed to add asset"));
        }
    }



    @PutMapping(path = "update")
    public ResponseEntity<?> updateAsset(@RequestBody Asset asset, HttpServletRequest request) {
        String assetSerialNo = asset.getSerialNo();
        log.info("Asset with serial number: " + assetSerialNo + " added to the system");
        return ResponseEntity.ok().body(assetService.updateAssetInformation(asset, request));
    }

    //Get asset by id
    @GetMapping(path = "{id}")
    public ResponseEntity<?> listAssetById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(assetService.asset_details(id));
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.ok().body(new Response("Asset has been deleted"));
    }


    //    asset qrcode
    @GetMapping(path = "{id}/qr", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<?> assetQRCOde(@PathVariable Long id) throws IOException, WriterException {
        Asset asset = assetrepository.getAssetByid(id);
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        String assetData = "Asset Name: \t\t" + asset.getAsset_name() + "\n" +
                "Asset Description: \t\t" + asset.getDescription() + "\n" +

                "Asset Code: \t\t" + category.getCategoryName() + "\n" +
                "Asset Cost: \t\t" + asset.getCost() + "\n" +
//                "Asset Cost: \t\t" + asset.getCost() + "\n" +
                "Asset S/No: \t\t" + asset.getSerialNo();
        QRcodegenerator qRcodegenerator = new QRcodegenerator();
        log.info("QRcode of asset with id: " + id + " generated");

        return ResponseEntity.ok().body(qRcodegenerator.qrCode(assetData));
    }

    @GetMapping(path = "{id}/barcode", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<?> assetBarcode(@PathVariable Long id) throws IOException {
        Asset asset = assetrepository.getAssetByid(id);
        Long category_ID = asset.getCategory_fk();
        Category category = categoryRepository.getCategoryByid(category_ID);
        String assetData = "Asset Name: \t\t" + asset.getAsset_name() + "\n" +
                "Asset Description: \t\t" + asset.getDescription() + "\n" +
                "Asset Code: \t\t" + category.getCategoryName() + "\n" +
                "Asset Cost: \t\t" + asset.getCost() + "\n" +
                "Asset S/No: \t\t" + asset.getSerialNo();

        try {
            BitMatrix bitMatrix = new MultiFormatWriter().encode(assetData, BarcodeFormat.CODE_128, 200, 100);
            BufferedImage bufferedImage = toBufferedImage(bitMatrix);
            log.info("Barcode of asset with id: " + id + " generated");
            return ResponseEntity.ok().contentType(MediaType.valueOf(MimeTypeUtils.IMAGE_PNG_VALUE))
                    .body(bufferedImage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to generate barcode");
        }
    }

    private BufferedImage toBufferedImage(BitMatrix bitMatrix) {
        int width = bitMatrix.getWidth();
        int height = bitMatrix.getHeight();
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                image.setRGB(x, y, bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF);
            }
        }
        return image;
    }


    @PostMapping(path = "upload")
    public ResponseEntity<Response> uploadFile(@RequestParam MultipartFile file) throws IOException {
        String message = "";

        if (Excellimports.hasExcelFormat(file)) {

            assetService.excellimport(file);
            message = "File upload successfully";
            log.info("new stock added to system");
            return ResponseEntity.ok().body(new Response(message));

        }
        filesStorageService.save(file);
        message = "Please upload an excel file!";
        return ResponseEntity.ok().body(new Response(message));
    }


    @PostMapping("file/upload")
    public ResponseEntity<Response> fileUpload(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            filesStorageService.save(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new Response(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new Response(message));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = filesStorageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder.fromMethodName(MainController.class, "getFile", path.getFileName().toString()).build().toString();
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String code = randomString();
            return new FileInfo(filename, url, formatter.format(date), code);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    public String randomString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 8) {
            // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String codeString = salt.toString();
        return codeString;
    }

    @GetMapping(path = "template/download/{filename:.+}")
    public ResponseEntity<Resource> downloadTemplate(@PathVariable String filename) {
        filename = "Excel_data_template";
        Resource file = filesStorageService.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = filesStorageService.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping(path = "disposal/records")
    public ResponseEntity<?> getdisposalrecords() {
        return ResponseEntity.ok().body(assetService.getdisposalrecords());
    }

    @PostMapping(path = "disposal/{id}")
    public ResponseEntity<?> disposal(@PathVariable Long id, @RequestBody AssetDisposal assetDisposal) {
        assetService.assetDisposing(id, assetDisposal);
        return ResponseEntity.ok().body(new Response("Disposal successfully done!!"));
    }

    @PostMapping(path = "writeoff/{id}")
    public ResponseEntity<?> writeoff(@PathVariable Long id, @RequestBody WriteOff writeOff) {
        assetService.assetWriteoff(id, writeOff);
        return ResponseEntity.ok().body(new Response("Asset Written-Off successfully done!!"));
    }


    //Asset Revaluation
    @PostMapping(path = "revaluate/{id}")
//    @PreAuthorize("hasRole('CLERK')")
    public ResponseEntity<?> revaluateAsset(@PathVariable Long id, @RequestBody Revaluation revaluation, HttpServletRequest request) {
        assetService.asset_revaluate(id, revaluation, request);
        return ResponseEntity.ok().body(new Response("Asset Revaluation  successful!!"));
    }


    //transfer Asset
    @PostMapping(path = "transfer/{sn}")
    public ResponseEntity<?> transfer(@PathVariable Long sn, @RequestBody Transfer transfer, HttpServletRequest request) {
        assetService.tansferasset(sn, transfer, request);
        return ResponseEntity.ok().body(new Response("Asset Transferred successfully"));
    }

    @PostMapping(path = "newvendor/{id}")
    public ResponseEntity<?> newvendor(@RequestBody Vendor vendor, @PathVariable Long id) {
        assetService.newVendor(vendor, id);
        return ResponseEntity.ok().body(new Response("Vendor has been added"));
    }

    @GetMapping(path = "getVendor/{id}")
    public ResponseEntity<?> getVendors(@PathVariable Long id) {
        return ResponseEntity.ok().body(assetService.getVendor(id));
    }

    @PutMapping(path = "updateVendor/{id}")
    public ResponseEntity<?> updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        assetService.updateVendor(vendor, id);
        return ResponseEntity.ok().body(new Response("Vendor has been updated"));
    }

    @Transactional
    @DeleteMapping(path = "vendor/delete/{id}")
    public ResponseEntity<?> deleteVendor(@PathVariable Long id) {
        assetService.deleteVendor(id);
        return ResponseEntity.ok().body(new Response("Vendor deleted successfully"));
    }

    @PostMapping(path = "newWarranty/{id}")
    public ResponseEntity<?> newWarranty(@PathVariable Long id, @RequestBody Warranty warranty) {
        assetService.newwaranty(warranty, id);
        return ResponseEntity.ok().body(new Response("warranty added successfully"));
    }

    @PutMapping(path = "updatewarranty/{id}")
    public ResponseEntity<?> updateWarranty(@PathVariable Long id, @RequestBody Warranty warranty) {
        assetService.updateWarranty(warranty, id);
        return ResponseEntity.ok().body(new Response("warranty updated successfully"));
    }

    @GetMapping(path = "getWarranty")
    public ResponseEntity<?> getWarranty() {
        return ResponseEntity.ok().body(assetService.getWarranty());
    }

    @Transactional
    @DeleteMapping(path = "warranty/delete/{id}")
    public ResponseEntity<?> deleteWarranty(@PathVariable Long id) {
        assetService.deleteWarratnty(id);
        return ResponseEntity.ok().body(new Response("Warranty deleted successfully"));
    }

    @PostMapping(path = "newMaintenance/{id}")
    public ResponseEntity<?> createMaintenance(@RequestBody Maintenance maintenance, @PathVariable Long id) throws ParseException, GeneralSecurityException {
        assetService.newMaintenance(maintenance, id);
        return ResponseEntity.ok().body(new Response("Maintenance added successfully"));
    }

    @GetMapping(path = "getMaintenance/{id}")
    public ResponseEntity<?> getMaintenance(@PathVariable Long id) {
        return ResponseEntity.ok().body(assetService.getMaintenance(id));
    }

    @PutMapping(path = "updateMaintenance")
    public ResponseEntity<?> updateMaintenance(@RequestBody Maintenance maintenance) {
        assetService.updateMaintance(maintenance);
        return ResponseEntity.ok().body(new Response("Maintenance updated successfully"));

    }

    @Transactional
    @DeleteMapping(path = "maintenance/delete/{id}")
    public ResponseEntity<?> deleteMaintenance(@PathVariable Long id) {
        assetService.deletMaintenance(id);
        return ResponseEntity.ok().body(new Response("maintenance deleted successfully"));
    }

    @PostMapping(path = "newWorkorder/{id}")
    public ResponseEntity<?> newWorkorder(@PathVariable Long id, @RequestBody Workorder workorder) {
        assetService.newWorkorder(workorder, id);
        return ResponseEntity.ok().body(new Response("Work order added successfully"));
    }

    @PutMapping(path = "updateWorkorder/{id}")
    public ResponseEntity<?> updateworkorder(@PathVariable Long id, @RequestBody Workorder workorder) {
        assetService.updateworkorder(id, workorder);
        return ResponseEntity.ok().body(new Response("Work order Updated"));
    }

    @GetMapping(path = "getWorkOrder")
    public ResponseEntity<?> getWorkorder() {
        return ResponseEntity.ok().body(assetService.getWorkorder());
    }

    @Transactional
    @DeleteMapping(path = "workorder/delete/{id}")
    public ResponseEntity<?> deleteWorkorder(@PathVariable Long id) {
        assetService.deletWorkorder(id);
        return ResponseEntity.ok().body(new Response("workorder deleted successfully"));
    }

    @PostMapping(path = "newInsurance/{id}")
    public ResponseEntity<?> newInsurance(@PathVariable Long id, @RequestBody Insurance insurance) {
        assetService.newInsurance(insurance, id);
        return ResponseEntity.ok().body(new Response("Insurance added successfully"));
    }

    @PutMapping(path = "updateinsurance/{id}")
    public ResponseEntity<?> updateInsurance(@PathVariable Long id, @RequestBody Insurance insurance) {
        assetService.updateinsuranace(id, insurance);
        return ResponseEntity.ok().body(new Response("Insurance updated successfully"));
    }

    @GetMapping(path = "getInsurance")
    public ResponseEntity<?> getInsurance() {
        return ResponseEntity.ok().body(assetService.getInsurance());
    }

    @Transactional
    @DeleteMapping(path = "insurance/delete/{id}")
    public ResponseEntity<?> deleteInsurance(@PathVariable Long id) {
        assetService.deleteInsurance(id);
        return ResponseEntity.ok().body(new Response("insurance deleted successfully"));
    }

    @GetMapping(path = "pendingrequests")
    public ResponseEntity<?> request() {
        return ResponseEntity.ok().body(assetService.getRequests());
    }

    @GetMapping(path = "pendingrequests/{id}")
    public ResponseEntity<?> requestByid(@PathVariable Long id) {
        return ResponseEntity.ok().body(assetService.getrequestByid(id));
    }

    @PutMapping(path = "approval/{id}")
    public ResponseEntity<?> approval(@PathVariable Long id) {
        assetService.assetApproval(id);
        return ResponseEntity.ok().body(new Response("Asset verified successfully"));
    }

    @PutMapping(path = "rejection/{id}")
    public ResponseEntity<?> approval(@PathVariable Long id, @RequestBody String reason) {
        assetService.actionrejection(id, reason);
        return ResponseEntity.ok().body(new Response("Action rejected successfully"));
    }

    @GetMapping(path = "findbycatgory/{category}")
    public ResponseEntity<?> findBycatgory(@PathVariable String category) {
        return ResponseEntity.ok().body(assetService.finddByCategory(category));
    }

    @GetMapping(path = "findbydepartment/{department}")
    public ResponseEntity<?> findBydepartment(@PathVariable String department) {
        return ResponseEntity.ok().body(assetService.findByDepartment(department));
    }

    @GetMapping(path = "findbycounts")
    public ResponseEntity<?> findCountBycategory() {
        return ResponseEntity.ok().body(assetService.getcategorycount());
    }

    @GetMapping(path = "category/totalassets")
    public ResponseEntity<?> getAssetByCategory() {
        return ResponseEntity.ok().body(assetService.getAssetByCategory());
    }

    @GetMapping(path = "department/totalassets")
    public ResponseEntity<?> getAssetByDepartment() {
        return ResponseEntity.ok().body(assetService.getAssetsByDepartment());
    }


}
