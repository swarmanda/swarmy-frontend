export interface SubscriptionConfig {
  currency: string;
  storageCapacity: SubscriptionItem;
  bandwidth: SubscriptionItem;
}

export interface SubscriptionItem {
  pricePerGb: number;
  defaultOption: number;
  options: Option[];
}

export interface Option {
  exp: number;
  label: string;
  size: number;
}


export function getStorageCapacityBySize(config: SubscriptionConfig, size: number) {
  return config.storageCapacity.options.find((o) => o.size === size);
}

export function getBandwidthBySize(config: SubscriptionConfig, size: number) {
  return config.bandwidth.options.find((o) => o.size === size);
}

export function getStorageCapacityByExp(config: SubscriptionConfig, exp: number) {
  return config.storageCapacity.options.find((o) => o.exp === exp);
}

export function getBandwidthByExp(config: SubscriptionConfig, exp: number) {
  return config.bandwidth.options.find((o) => o.exp === exp);
}
