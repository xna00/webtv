import React from 'react';
import hotUpdate from 'react-native-ota-hot-update';
import {Alert, Platform, ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {version} from './ota/package.json';

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
    const apiVersionBase = 'https://cdn.jsdelivr.net/npm/webtvota/';
    fetch(new URL('update.json', apiVersionBase), {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then(async data => {
        const result = await data.json();
        if (!result) {
          return;
        }
        const [v1a, v1b, v1c] = result.version.split('.');
        const [v2a, v2b, v2c] = version.split('.');
        if (v1a !== v2a || v1b !== v2b) {
          ToastAndroid.show('发现新版本，请更新', ToastAndroid.SHORT);
          return;
        }
        const currentVersion =
          (await hotUpdate.getCurrentVersion()) || Number(v2c);
        console.log(currentVersion);
        if (Number(v1c) > currentVersion) {
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
                      ? new URL(result?.downloadIosUrl, apiVersionBase).href
                      : new URL(result?.downloadAndroidUrl, apiVersionBase)
                          .href,
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
    if (!__DEV__) {
      onCheckVersion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
