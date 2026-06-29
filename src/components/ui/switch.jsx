import * as React from 'react';

const Switch = React.forwardRef(({ className = '', checked = false, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="switch"
    aria-checked={checked}
    className={className}
    onClick={() => onCheckedChange?.(!checked)}
    {...props}
  >
    {checked ? 'On' : 'Off'}
  </button>
));

Switch.displayName = 'Switch';

export { Switch };
export default Switch;
