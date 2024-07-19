import { Center, Group, Paper, RingProgress, Stack, Text } from '@mantine/core';
import { formatBytes } from './FileSizeFormatter.ts';
import classes from './QuotaMetricsCard.module.css';

interface QuotaMetricsCardProps {
  title: string;
  description: string;
  value: number;
  limit: number;
  valueType: 'BYTES' | 'COUNT';
}

export function QuotaMetricsCard({
  title,
  description,
  value,
  limit,
  valueType,
}: QuotaMetricsCardProps) {
  const progress = (value / limit) * 100;
  const percent = progress.toFixed(1);
  console.log(value, limit, progress);

  return (
    <Paper className={classes.wrapper} withBorder radius="md" p="xs">
      <Group>
        <RingProgress
          size={120}
          thickness={8}
          sections={[{ value: progress, color: 'green.2' }]}
          label={
            <Center>
              <b>{percent}%</b>
            </Center>
          }
        />

        <Stack>
          <Stack gap="0">
            <Text size="md" tt="uppercase" fw={700}>
              {title}
            </Text>
            <Text c="dimmed" fw={500} size="xs">
              {description}
            </Text>
          </Stack>

          <Stack gap="0">
            <Text size="xs" fw={700}>
              {valueType === 'BYTES' ? formatBytes(value) : value}
            </Text>
            <Text c="dimmed" fw={500} size="xs">
              of {valueType === 'BYTES' ? formatBytes(limit) : limit}
            </Text>
          </Stack>
        </Stack>
      </Group>
    </Paper>
  );
}
