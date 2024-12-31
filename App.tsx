import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useCheckVersion} from './useCheckVersion';
import {channels} from './channels';

function App() {
  const webviewRef = useRef<WebView>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState<number>();
  const scrollRef = useRef<ScrollView>(null);
  const selectedRef = useRef<View | null>(null);
  const channel = typeof index === 'number' ? channels[index] : undefined;

  useCheckVersion();

  useEffect(() => {
    if (typeof index === 'number') {
      AsyncStorage.setItem('lastIndex', index.toString());

      // scrollRef.current?.scrollTo({y: index * 42});
    }
  }, [index]);

  const scrollToSelected = (e: View | null) => {
    e?.measure((x, y, width, height, pageX, pageY) => {
      console.log(y, pageY);
      console.log(scrollRef.current);
      scrollRef.current?.scrollTo({y: y - 170, animated: false});
    });
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        scrollToSelected(selectedRef.current);
      });
    }
  }, [visible]);

  useEffect(() => {
    AsyncStorage.getItem('lastIndex').then(res => {
      console.log(res);
      let i = Number(res ?? 0);
      if (i < 0 || i >= channels.length) {
        i = 0;
      }
      setIndex(i);
    });
  }, []);

  if (!channel) return null;

  return (
    // <SafeAreaView style={backgroundStyle}>
    <View
      style={{height: '100%'}}
      onTouchEnd={e => {
        e.stopPropagation();
        setVisible(!visible);
      }}>
      <StatusBar
        barStyle={false ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <View style={{flex: 1}} pointerEvents="none">
        <WebView
          key={index}
          onTouchStart={e => e.preventDefault()}
          onTouchEnd={e => e.preventDefault()}
          ref={webviewRef}
          userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
          source={{
            uri: channel.url,
          }}
          webviewDebuggingEnabled
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          mediaCapturePermissionGrantType="grant"
          onLoad={e => {
            // console.log(channel.code);
            webviewRef.current?.injectJavaScript(channel.code);
          }}></WebView>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 300,
          height: '100%',
          backgroundColor: 'white',
          display: visible ? 'flex' : 'none',
        }}
        onTouchStart={e => {
          e.stopPropagation();
        }}>
        {channels.map((c, i) => (
          <View
            ref={e => {
              i === index && (selectedRef.current = e);
            }}
            key={c.url + c.name}
            style={{
              borderWidth: 1,
              borderColor: i === index ? 'red' : 'transparent',
              padding: 4,
              borderRadius: 4,
            }}
            onTouchEnd={e => {
              setIndex(i);
            }}>
            <Text
              style={{
                fontSize: 20,
                padding: 4,
              }}>
              {c.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>

    // </SafeAreaView>
  );
}

export default App;
