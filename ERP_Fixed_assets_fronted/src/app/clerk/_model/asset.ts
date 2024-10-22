export class AssetModel {
        id?: number;
        assetName?: string;
        description?: string;
        serialNo?: string;
        cost?: number;
        acquisitionDate?: Date;
        depreciationType?: string;
        depreciationRate?: number;
        postedBy?: string;
        postedTime?: Date;
        modifiedBy?: string;
        modifiedTime?: Date;
        // @Column(length = 50)
        verifiedBy?: string;
        verifiedTime?: Date;
        deletedFlag?: boolean;
        size?: number;
        regNo?: string;
        engineNo?: string;
        chasisNo?: string;
        localAuthority?: string;
        type?: string;
        model?: string;
        make?: string;
        remarks?: string;
        usageLifetime?: number;
        custodian?: string;
        location?: string;
        category?: string;
        departmentUnit?: string;
        lrno?: number;
}

   




