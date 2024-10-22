package com.fams.fixedasset.assetmanagement.asset;

import com.fams.fixedasset.assetmanagement.Utils.CONSTANTS;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.apache.commons.codec.Charsets;

import java.io.ByteArrayOutputStream;
import java.io.IOException;


public class QRcodegenerator {
    public byte[] qrCode(String data) throws IOException, WriterException {
        BitMatrix matrix = new MultiFormatWriter().encode(
                new String(data.getBytes(Charsets.UTF_8), Charsets.UTF_8),
                BarcodeFormat.QR_CODE, 200, 200);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        MatrixToImageWriter.writeToStream(
                matrix, CONSTANTS.PNG, outputStream);

        return outputStream.toByteArray();
    }
}
