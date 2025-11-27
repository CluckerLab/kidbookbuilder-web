declare module 'framer-motion' {
  import * as React from 'react';

  interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    variants?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    [key: string]: any;
  }

  type MotionComponent<P> = React.ComponentType<P & MotionProps>;

  export const motion: {
    div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>;
    span: MotionComponent<React.HTMLAttributes<HTMLSpanElement>>;
    img: MotionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
    button: MotionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    a: MotionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    // Add other HTML elements as needed
    [key: string]: MotionComponent<any>;
  };
}