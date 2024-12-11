import React from 'react';
import hotUpdate from 'react-native-ota-hot-update';
import {Alert, Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const apiVersion = 'http://192.168.1.5:8080/update.json';
export const useCheckVersion = () => {
  const startUpdate = async (url: string, version: number) => {
    hotUpdate.downloadBundleUri(ReactNativeBlobUtil, url, version, {
      updateSuccess: () => {
        console.log('update success!');
      },
      updateFail(message?: string) {
        Alert.alert('Update failed!', message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
      },
      restartAfterInstall: true,
    });
  };
  const onCheckVersion = () => {
    
    fetch(apiVersion)
      .then(async data => {
        const result = await data.json();
        const currentVersion = await hotUpdate.getCurrentVersion();
        console.log(currentVersion);
        if (result?.version > currentVersion) {
          Alert.alert(
            'New version is comming!',
            'New version has release, please update',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Update',
                onPress: () =>
                  startUpdate(
                    Platform.OS === 'ios'
                      ? result?.downloadIosUrl
                      : result?.downloadAndroidUrl,
                    result.version,
                  ),
              },
            ],
          );
        }
      })
      .catch(e => {
        Alert.alert('Bad' + e);
      });
  };
  React.useEffect(() => {
    onCheckVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
