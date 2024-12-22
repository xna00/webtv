import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useCheckVersion} from './useCheckVersion';

const hnChannels = [
  '河南卫视',
  '新闻频道',
  '都市频道',
  '民生频道',
  '法治频道',
  '公共频道',
  '河南乡村频道',
  '电视剧频道',
  '梨园频道',
  '文物宝库',
  '武术频道',
  '睛彩中原',
  '移动戏曲频道',
  '象视界',
  '国学频道',
  // '欢腾购物',
];

const hnCode = (name: string) => `
[...document.querySelectorAll('audio, video')].forEach(el => el.muted = true)
const style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule('video { visibility: hidden; }', 0);
[...document.querySelectorAll('audio, video')].forEach(el => el.muted = true)



function change(name) {
  // [...document.querySelectorAll('audio, video')].forEach(el => el.muted = true)
  const list = document.querySelector('.channelList');
  console.log(list)
  const item = [...list.querySelectorAll('.channelContent')].find(e => {
    console.log(e)
    return e.innerText === name;
  });
  console.log(item)
  const programmeContent = item?.parentElement?.lastChild;
  console.log(programmeContent)
  if (!programmeContent) return;
  if (!programmeContent.matches('.on')) {
    item.click();
  }
  setTimeout(() => {
  const programmeList = [...programmeContent.querySelectorAll('li')];
  console.log(programmeList)
  const live = programmeList.map(e => e.firstChild).find(e => e.matches('.live'));
  console.log(live)
  live?.click();

  style.remove();

  const style2 = document.createElement('style');
  document.head.appendChild(style2);
  style2.sheet.insertRule('* { width: 0 !important; height: 0!important }', 0);
  style2.sheet.insertRule(\`video {
    width: 100vw !important;
    height: 100vh !important;
    left: 0px !important;
    top: 0px !important;
    display: block !important;
    visibility: visible !important;
    cursor: auto !important;
    position: fixed !important;
    background: black !important;
  }\`, 0);

  }, 1000)
};

setTimeout(() => {
  change('${name}')
}, 1000)
`;

const cctvCode = `
setTimeout(() => {
const style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule('* { visibility: hidden; }', 0);
style.sheet.insertRule('body { height: 100vh; }', 0);
style.sheet.insertRule(\`video#h5player_player {
  width: 100vw !important;
  height: 100vh !important;
  left: 0px !important;
  top: 0px !important;
  display: block !important;
  visibility: visible !important;
  cursor: auto !important;
  position: fixed !important;
}\`, 0);

// document.querySelector('#player_fullscreen_player')?.click();
// document.querySelector('#h5player_player')?.play()

}, 0)

`;

const channels: {name: string; url: string; code: string}[] = [
  ...[
    {name: 'CCTV-1 综合', url: 'https://tv.cctv.com/live/cctv1/'},
    {name: 'CCTV-2 财经', url: 'https://tv.cctv.com/live/cctv2/'},
    {name: 'CCTV-3 综艺', url: 'https://tv.cctv.com/live/cctv3/'},
    {name: 'CCTV-4 中文国际（亚）', url: 'https://tv.cctv.com/live/cctv4/'},
    {name: 'CCTV-5 体育', url: 'https://tv.cctv.com/live/cctv5/'},
    {name: 'CCTV-5+ 体育赛事', url: 'https://tv.cctv.com/live/cctv5plus/'},
    {name: 'CCTV-6 电影', url: 'https://tv.cctv.com/live/cctv6/'},
    {name: 'CCTV-7 国防军事', url: 'https://tv.cctv.com/live/cctv7/'},
    {name: 'CCTV-8 电视剧', url: 'https://tv.cctv.com/live/cctv8/'},
    {name: 'CCTV-9 纪录', url: 'https://tv.cctv.com/live/cctvjilu/'},
    {name: 'CCTV-10 科教', url: 'https://tv.cctv.com/live/cctv10/'},
    {name: 'CCTV-11 戏曲', url: 'https://tv.cctv.com/live/cctv11/'},
    {name: 'CCTV-12 社会与法', url: 'https://tv.cctv.com/live/cctv12/'},
    {name: 'CCTV-13 新闻', url: 'https://tv.cctv.com/live/cctv13/'},
    {name: 'CCTV-14 少儿', url: 'https://tv.cctv.com/live/cctvchild/'},
    {name: 'CCTV-15 音乐', url: 'https://tv.cctv.com/live/cctv15/'},
    {name: 'CCTV-16 奥林匹克', url: 'https://tv.cctv.com/live/cctv16/'},
    {name: 'CCTV-17 农业农村', url: 'https://tv.cctv.com/live/cctv17/'},
    {
      name: 'CCTV-4 中文国际（欧）',
      url: 'https://tv.cctv.com/live/cctveurope/index.shtml',
    },
    {
      name: 'CCTV-4 中文国际（美）',
      url: 'https://tv.cctv.com/live/cctvamerica/',
    },
  ].map(e => ({...e, code: cctvCode})),
  ...hnChannels.map(name => ({
    name,
    url: 'https://static.hntv.tv/kds/#/',
    code: hnCode(name),
  })),
];

function App() {
  const webviewRef = useRef<WebView>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState<number>();
  const channel = typeof index === 'number' ? channels[index] : undefined;

  useCheckVersion();

  useEffect(() => {
    webviewRef.current?.reload();
    if (typeof index === 'number') {
      AsyncStorage.setItem('lastIndex', index.toString());
    }
  }, [index]);

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
