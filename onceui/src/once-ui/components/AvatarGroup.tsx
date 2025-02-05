"use client";

import React, { forwardRef } from "react";
import { Avatar, Flex } from ".";
import styles from "./AvatarGroup.module.scss";
import classNames from "classnames";

// Define the specific props we need for each avatar
interface AvatarItem {
  value?: string;
  style?: React.CSSProperties;
}

interface AvatarGroupProps extends React.ComponentProps<typeof Flex> {
  avatars: AvatarItem[];
  size?: "xs" | "s" | "m" | "l" | "xl";
  reverse?: boolean;
  limit?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, size = "m", reverse = false, limit, className, style, ...rest }, ref) => {
    const displayedAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount = limit && avatars.length > limit ? avatars.length - limit : 0;

    return (
      <Flex
        position="relative"
        vertical="center"
        ref={ref}
        className={classNames(styles.avatarGroup, className)}
        style={style}
        zIndex={0}
        {...rest}
      >
        {displayedAvatars.map((avatar, index) => (
          <Avatar
            position="relative"
            key={index}
            size={size}
            value={avatar.value}
            className={styles.avatar}
            style={{
              ...avatar.style,
              zIndex: reverse ? displayedAvatars.length - index : index + 1,
            }}
          />
        ))}
        {remainingCount > 0 && (
          <Avatar
            value={`+${remainingCount}`}
            className={styles.avatar}
            size={size}
            style={{
              ...style,
              zIndex: reverse ? -1 : displayedAvatars.length + 1,
            }}
          />
        )}
      </Flex>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
export type { AvatarGroupProps };
