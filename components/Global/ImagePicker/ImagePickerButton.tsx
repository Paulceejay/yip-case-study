import { useFilePicker } from '@/base/hooks/filePicker/useFilePicker';
import { cn } from '@/base/libs/cn';
import { AppText } from '@/components/Global/AppSetup/AppText';
import { UploadIcon } from '@/components/Global/Icons/UploadIcon';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

const ImagePickerButton = ({
  onSelect,
  className,
  labelClassName,
  defaultValue,
}: {
  className?: string;
  labelClassName?: string;
  onSelect?: (file: any) => void;
  defaultValue?: string | any;
}) => {
  const { selectFile, files, isLoading } = useFilePicker({
    multiple: false,
    allowEditing: true,
    limit: 1,
    toBlob: true,
    mediaTypes: 'photo',
  });

  const pickedImage = files?.[0]?.uri || defaultValue;

  const openPicker = async () => {
    const res = await selectFile();
    if (res && res[0]) {
      onSelect?.(res[0]);
    }
  };

  return (
    <Pressable
      onPress={openPicker}
      className={cn(
        'relative h-36 rounded-xl border border-borderColorSecondary dark:border-whiteColor/70',
        className
      )}>
      {/* Floating Label */}
      <View
        className={cn('absolute -top-2.5 left-3 z-20 rounded-full bg-bgLight px-2.5 dark:bg-bgDark', labelClassName)}>
        <AppText className="text-sm font-medium" fontFamily="SourceSans3-Medium">
          Image (Optional)
        </AppText>
      </View>

      {/* If image picked or default exists > show preview */}
      {pickedImage ? (
        <Image
          source={typeof pickedImage === 'string' ? { uri: pickedImage } : pickedImage}
          className="h-full w-full rounded-xl"
          contentFit="cover"
        />
      ) : (
        // Default upload UI
        <View className="flex-1 items-center justify-center gap-2">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-borderColorSecondary dark:bg-whiteColor/20">
            <UploadIcon />
          </View>
          <AppText className="text-sm font-medium" fontFamily="SourceSans3-Medium">
            Upload File
          </AppText>
        </View>
      )}
    </Pressable>
  );
};

const memoizedImagePickerButton = memo(ImagePickerButton);
export { memoizedImagePickerButton as ImagePickerButton };
