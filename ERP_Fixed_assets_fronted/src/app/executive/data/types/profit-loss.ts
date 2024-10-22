export interface ProfitLoss {
  id?: number;
  asset_name?: string;
  assetCode?: string;
  disposalValue?: number;
  disposalType?: string;
  remarks?: string;
  status?: string;
  amount?: number;
  assetCost?: number;
  dateAdded?: Date;
  profit_OR_loss?: number;
  assetState?: string
}
