import * as Crypto from 'expo-crypto';
import { useMediaLibraryPermissions } from 'expo-image-picker';
import { useState } from 'react';
import { Image } from 'react-native-compressor';
import ImageCropPicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'react-native-image-picker';
import { getAspectRatioDimensions } from '../../libs/getAspectRatioDimensions';

export type FileBinary = {
  uri: string;
  name: string;
  type: string;
};

export type SelectedImage = ImagePicker.Asset & {
  binary?: FileBinary;
  id: string;
  blob?: Blob;
};

export const useFilePicker = ({
  multiple,
  allowEditing,
  limit,
  mediaTypes,
  toBlob,
  aspect = [4, 4],
  onCancel,
}: {
  multiple?: boolean;
  allowEditing?: boolean;
  limit?: number;
  mediaTypes?: ImagePicker.MediaType;
  toBlob: boolean;
  aspect?: [number, number];
  onCancel?: () => void;
}) => {
  const [files, setFiles] = useState<SelectedImage[]>([]);
  const [status, requestPermission] = useMediaLibraryPermissions({ get: true });
  const [updatedAt, setUpdatedAt] = useState<string>(new Date().toISOString());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openMediaLibrary = async (): Promise<Required<ImagePicker.Asset>[]> => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: mediaTypes ?? 'photo',
      selectionLimit: limit ?? 1,
    });

    if (result.didCancel) {
      onCancel?.();
      return [];
    }

    const assets = result.assets ?? [];

    if (!multiple && allowEditing) {
      const [asset] = assets;

      // Only crop if it's an image
      if (asset.type?.startsWith('image/')) {
        const imageUri = asset.uri as string;
        const { height, width } = getAspectRatioDimensions(asset.width as number, asset.height as number, aspect);

        const croppedImage = await ImageCropPicker.openCropper({
          path: imageUri,
          width,
          height,
          cropperCircleOverlay: false,
          mediaType: 'photo',
        });

        return [
          {
            ...asset,
            width: croppedImage.cropRect?.width,
            height: croppedImage.cropRect?.height,
            uri: croppedImage.path,
          },
        ] as Required<ImagePicker.Asset>[];
      }
    }

    return assets as Required<ImagePicker.Asset>[];
  };

  const selectFile = async () => {
    if (!status?.granted && status?.canAskAgain) {
      await requestPermission();
    }

    setIsLoading(true);
    let libraryAssets = await openMediaLibrary();

    if (limit && libraryAssets.length > limit) {
      libraryAssets = libraryAssets.splice(0, limit);
    }

    const mediaWithBlob: SelectedImage[] = [];
    if (toBlob) {
      for await (const asset of libraryAssets) {
        // Only compress images, not videos
        if (asset.type?.startsWith('image/')) {
          const compressedImage = await Image.compress(asset.uri);
          if (compressedImage) {
            asset.uri = compressedImage;
          }
        }

        const binary = fetchFileBinary(asset);
        const blob = await getFileBlob(asset.uri);
        asset.fileSize = asset.fileSize ?? blob.size;

        const id = Crypto.randomUUID();
        mediaWithBlob.push({ ...asset, binary, blob, id } as SelectedImage);
      }

      setFiles(mediaWithBlob);
      setUpdatedAt(new Date().toISOString());
      setIsLoading(false);
      return mediaWithBlob;
    } else {
      const withIds = libraryAssets.map((asset) => ({
        ...asset,
        id: Crypto.randomUUID(),
      })) as SelectedImage[];

      setFiles(withIds);
      setUpdatedAt(new Date().toISOString());
      setIsLoading(false);
      return withIds;
    }
  };

  const fetchFileBinary = (asset: Required<ImagePicker.Asset>): FileBinary => {
    const { uri, type } = asset;
    const uriParts = uri.split('.');
    const fileExtension = uriParts.pop() ?? 'jpg';
    const fileName = extractFileName(uri);

    let mimeType = type;
    if (!mimeType) {
      mimeType = fileExtension === 'mp4' ? 'video/mp4' : 'image/' + fileExtension;
    }

    return {
      uri,
      name: `${fileName}.${fileExtension}`,
      type: mimeType,
    };
  };

  const extractFileName = (filePath: string): string => {
    const fileSplit = filePath.split('/');
    const fileNameWithExtension = fileSplit.pop();
    if (!fileNameWithExtension) {
      return fileSplit[fileSplit.length - 2];
    }
    const fileNameParts = fileNameWithExtension.split('.');
    fileNameParts.pop(); // Remove extension
    return fileNameParts.join('.');
  };

  const getFileBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return response.blob();
  };

  const removeFile = (id: string | number[]) => {
    const filteredFiles = files.filter((file) => file.id !== id);
    setFiles(filteredFiles);
    setUpdatedAt(new Date().toISOString());
  };

  const removeAllFiles = () => {
    setFiles([]);
    setUpdatedAt(new Date().toISOString());
  };

  return {
    selectFile,
    files,
    updatedAt,
    removeFile,
    removeAllFiles,
    isLoading,
    getFileBlob,
    fetchFileBinary,
  };
};
