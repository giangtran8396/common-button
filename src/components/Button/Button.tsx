import React, { ComponentProps } from "react";
import classes from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}
export function Button({children, ...rest}:ButtonProps) {
  return <button className={classes['button']} {...rest}>{children}</button>;
}
