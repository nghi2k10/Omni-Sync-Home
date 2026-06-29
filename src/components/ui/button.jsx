import * as React from 'react';

const buttonVariants = () => '';

const Button = React.forwardRef(({ className = '', ...props }, ref) => (
  <button ref={ref} className={className} {...props} />
));
Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
