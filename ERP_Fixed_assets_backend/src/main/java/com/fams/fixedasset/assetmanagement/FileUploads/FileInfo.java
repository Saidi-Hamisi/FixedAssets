package com.fams.fixedasset.assetmanagement.FileUploads;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FileInfo {

        private String name;
        private String url;
        private String dateAdded;
        private String refCode;
}
