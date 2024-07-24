import { Table, Text } from '@mantine/core';
import classes from './BillingConfigurator.module.css';
import { getBandwidthByExp, getStorageCapacityByExp, SubscriptionConfig } from './SubscriptionConfig.ts';

interface Props {
  config: SubscriptionConfig;
  storageCapacity: number;
  bandwidth: number;
}

export function SubscriptionSummary({ config, bandwidth, storageCapacity }: Props) {

  function getMonthlyCapacityCost() {
    const requestedCapacity = getStorageCapacityByExp(config, storageCapacity)?.size || 0;
    return config.storageCapacity.pricePerGb * requestedCapacity;
  }

  function getMonthlyBandwidthCost() {
    const requestedBandwidth = getBandwidthByExp(config, bandwidth)?.size || 0;
    return config.bandwidth.pricePerGb * requestedBandwidth;
  }

  function getSelectedCapacityLabel() {
    return getStorageCapacityByExp(config, storageCapacity)?.label;
  }

  function getSelectedBandwidthLabel() {
    return getBandwidthByExp(config, bandwidth)?.label;
  }

  function getMonthlyTotal() {
    const total = getMonthlyCapacityCost() + getMonthlyBandwidthCost();
    return total.toFixed(2);
  }

  return (
    <Table className={classes.summaryTable}>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>Storage Capacity</Table.Td>
          <Table.Td>{getSelectedCapacityLabel()}</Table.Td>
          <Table.Td>
            {config.currency} {getMonthlyCapacityCost().toFixed(2)} / month
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>Bandwidth</Table.Td>
          <Table.Td>{getSelectedBandwidthLabel()}</Table.Td>
          <Table.Td>
            {config.currency} {getMonthlyBandwidthCost().toFixed(2)} / month
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>
            <Text fw={600}>Total</Text>
          </Table.Td>
          <Table.Td></Table.Td>
          <Table.Td>
            {config.currency} {getMonthlyTotal()} / month
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
