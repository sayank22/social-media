import React from 'react';
import { cn } from '../util/cn';

export default function Avatar({
  src,
  name,
  className,
}: {
  src?: string;
  name?: string;
  className?: string;
}) {
  return (
    <img
      src={
        src ? src : `https://api.dicebear.com/9.x/micah/png?seed=?name=${name}`
      }
      alt={name || 'Avatar'}
      width={32}
      height={32}
      className={cn('size-8 rounded-full', className)}
    />
  );
}
