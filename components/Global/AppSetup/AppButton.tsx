import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

export const AppButton = ({
  className,
  onPress,
  isLoading = false,
  children,
  disabled = false,
  smSize,
}: {
  className?: string;
  onPress?: () => void;
  isLoading?: boolean;
  children: any;
  disabled?: boolean;
  smSize?: boolean;
}) => {
  //

  return (
    <Pressable
      onPress={(e) => {
        e.stopPropagation();
        if (onPress) {
          onPress();
        }
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
      className={`rounded-[30px] text-whiteColor ${smSize ? 'px-4 py-3' : 'px-5 py-5'} flex flex-row items-center justify-center ${className}`}
      disabled={disabled || isLoading}>
      {children}

      {/*  */}
      {isLoading ? (
        <ActivityIndicator
          size={15}
          color={'#EFF4FF'} // primaryLight
          animating={true}
          style={{ marginLeft: 5, marginTop: 1 }}
        />
      ) : null}
    </Pressable>
  );
};
