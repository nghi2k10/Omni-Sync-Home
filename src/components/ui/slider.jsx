import * as React from 'react';

const Slider = React.forwardRef(({ className = '', value, onValueChange, ...props }, ref) => {
  const currentValue = Array.isArray(value) ? value[0] : value ?? 0;

  return (
    <input
      ref={ref}
      type="range"
      className={className}
      value={currentValue}
      onChange={(event) => onValueChange?.([Number(event.target.value)])}
      {...props}
    />
  );
});

Slider.displayName = 'Slider';

export { Slider };
export default Slider;
