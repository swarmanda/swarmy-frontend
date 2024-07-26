import { Slider } from '@mantine/core';
import classes from './BillingConfigurator.module.css';
import { Option } from './SubscriptionConfig.ts';

function min(options: Option[]) {
  return Math.min(...options.map((o) => o.exp));
}

function max(options: Option[]) {
  return Math.max(...options.map((o) => o.exp));
}

interface SliderProps {
  options: Option[];
  value: number;
  onChange: (value: ((prevState: number) => number) | number) => void;
  minSelection: number;
  default: number;
}

export function SubscriptionSlider({ minSelection, onChange, options, value: value1 }: SliderProps) {
  function adjust(value: number) {
    if (value < minSelection) {
      return;
    }
    onChange(value);
  }

  function getMarks() {
    return options.map((o) => ({
      value: o.exp,
      label: o.label,
    }));
  }

  return (
    <Slider
      className={classes.slider}
      step={1}
      min={min(options)}
      max={max(options)}
      value={value1}
      onChange={adjust}
      marks={getMarks()}
      label={null}
    />
  );
}
