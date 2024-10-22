
package com.fams.fixedasset.Reports;

import com.fams.fixedasset.assetmanagement.Depreciation.Depreciation;
import com.fams.fixedasset.assetmanagement.Depreciation.DepreciationEntityRepository;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fams.fixedasset.assetmanagement.asset.Assetrepository;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private Assetrepository assetRepository;

    @Autowired
    private DepreciationEntityRepository depreciationEntityRepository;



    public Workbook generateFixedAssetRegisterReport() throws IOException {
        // Fetch assets from the database or any other data source
        List<Asset> assets = assetRepository.findAll();

        // Generate the report in Excel format
        return ExcelReportGenerator.generateFixedAssetRegisterReport(assets);
    }




}
