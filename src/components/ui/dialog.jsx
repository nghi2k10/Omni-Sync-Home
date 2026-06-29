import * as React from 'react';

const Dialog = ({ children, open, onOpenChange, ...props }) => (open ? <div {...props}>{children}</div> : null);

const DialogContent = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>{children}</div>
));
DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ children, ...props }) => <div {...props}>{children}</div>;
const DialogTitle = ({ children, ...props }) => <h2 {...props}>{children}</h2>;

export { Dialog, DialogContent, DialogHeader, DialogTitle };
export default Dialog;
