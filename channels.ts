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

const hnStartCode = `
cookieStore.set({
    "domain": "hntv.tv",
    "expires": null,
    "name": "token",
    "partitioned": false,
    "path": "/",
    "sameSite": "lax",
    "secure": false,
    "value": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbklkIjpudWxsLCJ1c2VyX25hbWUiOiIxNTM0NjM0OTg5NyIsIm1vYmlsZSI6IjE1MzQ2MzQ5ODk3IiwiZHhVc2VySWQiOiIxOTY2MDI5ODE4NjgyMDkzNTcxIiwiYWN0dWFsX25hbWUiOm51bGwsImNsaWVudF9hdXRob3JpdGllcyI6WyJST0xFX1NVQlNDUklCRSIsIlJPTEVfQ01TIiwiUk9MRV9VU0VSIiwiUk9MRV9EWE5VTSIsIlJPTEVfRlVTSU9OIiwiUk9MRV9BVVRIIiwiUk9MRV9EWFFVQU4iLCJST0xFX0RYTlVNWk5YIiwiUk9MRV9TV0YiLCJST0xFX0xBQkVMIl0sImNsaWVudF9pZCI6ImR4bnVtIiwiYXVkIjpbImhucmFkaW8tcmVzb3VyY2UiXSwidXNlcl9pZCI6MTYwNDQyMDM1NDQ4Mzg4ODEzMCwidXNlcl9pZF9zdHIiOiIxNjA0NDIwMzU0NDgzODg4MTMwIiwicGF5bG9hZCI6e30sInNjb3BlIjpbInJlYWQiXSwibmlja25hbWUiOiLnlKjmiLdfMTY3MTM1ODU5NTg1NSIsImR4QWNjb3VudElkIjoiMTk2NjAyOTgxODY4MjA5MzU3MCIsImV4cCI6MTc1NzY1OTQxMCwianRpIjoiYTY0YmE1OGMtM2RmOC00ZDFiLWJiZmEtMmU1NzdkNzlkMTZmIn0.pIlHXRQwJlQP8NzKEbXq0kidG55CUXEo0-1ERlqYTXHKT93u6by5w07kL8mV9VEtWhKD5nX2yrdhy7TbXM9dVGBDz4RUoHL_klJP1j-vw9xOLJVakpIOsK7WccobdrVOoarUhvHami6p6caeB9qvzY2IcSXrhxcWV4fpyIiOfOFLu_14uzMVzTZ-qHGaSa1EKm0c8kRTPL3GApV8sFinEcoE4bA6awGmR2yPpCXwe41d-B8ElZlQBmR9h9Q7-b8GEx7AUtFswplybN9CwFgnZLsrfkUqaH48gncx6OBmntpnbDgi679SulMCWM_fSntygUatbRH6xPuxUXQWw9JiBw"
});
cookieStore.set({
    "domain": "hntv.tv",
    "expires": null,
    "name": "dxToken",
    "partitioned": false,
    "path": "/",
    "sameSite": "lax",
    "secure": false,
    "value": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbklkIjpudWxsLCJ1c2VyX25hbWUiOiIxNTM0NjM0OTg5NyIsIm1vYmlsZSI6IjE1MzQ2MzQ5ODk3IiwiZHhVc2VySWQiOiIxOTY2MDI5ODE4NjgyMDkzNTcxIiwiYWN0dWFsX25hbWUiOm51bGwsImNsaWVudF9hdXRob3JpdGllcyI6WyJST0xFX1NVQlNDUklCRSIsIlJPTEVfQ01TIiwiUk9MRV9VU0VSIiwiUk9MRV9EWE5VTSIsIlJPTEVfRlVTSU9OIiwiUk9MRV9BVVRIIiwiUk9MRV9EWFFVQU4iLCJST0xFX0RYTlVNWk5YIiwiUk9MRV9TV0YiLCJST0xFX0xBQkVMIl0sImNsaWVudF9pZCI6ImR4bnVtIiwiYXVkIjpbImhucmFkaW8tcmVzb3VyY2UiXSwidXNlcl9pZCI6MTYwNDQyMDM1NDQ4Mzg4ODEzMCwidXNlcl9pZF9zdHIiOiIxNjA0NDIwMzU0NDgzODg4MTMwIiwicGF5bG9hZCI6e30sInNjb3BlIjpbInJlYWQiXSwibmlja25hbWUiOiLnlKjmiLdfMTY3MTM1ODU5NTg1NSIsImR4QWNjb3VudElkIjoiMTk2NjAyOTgxODY4MjA5MzU3MCIsImV4cCI6MTc1NzY1OTQxMCwianRpIjoiYTY0YmE1OGMtM2RmOC00ZDFiLWJiZmEtMmU1NzdkNzlkMTZmIn0.pIlHXRQwJlQP8NzKEbXq0kidG55CUXEo0-1ERlqYTXHKT93u6by5w07kL8mV9VEtWhKD5nX2yrdhy7TbXM9dVGBDz4RUoHL_klJP1j-vw9xOLJVakpIOsK7WccobdrVOoarUhvHami6p6caeB9qvzY2IcSXrhxcWV4fpyIiOfOFLu_14uzMVzTZ-qHGaSa1EKm0c8kRTPL3GApV8sFinEcoE4bA6awGmR2yPpCXwe41d-B8ElZlQBmR9h9Q7-b8GEx7AUtFswplybN9CwFgnZLsrfkUqaH48gncx6OBmntpnbDgi679SulMCWM_fSntygUatbRH6xPuxUXQWw9JiBw"
});
localStorage.setItem('loginInfo', '[object Object]');
localStorage.setItem('token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbklkIjpudWxsLCJ1c2VyX25hbWUiOiIxNTM0NjM0OTg5NyIsIm1vYmlsZSI6IjE1MzQ2MzQ5ODk3IiwiZHhVc2VySWQiOiIxOTY2MDI5ODE4NjgyMDkzNTcxIiwiYWN0dWFsX25hbWUiOm51bGwsImNsaWVudF9hdXRob3JpdGllcyI6WyJST0xFX1NVQlNDUklCRSIsIlJPTEVfQ01TIiwiUk9MRV9VU0VSIiwiUk9MRV9EWE5VTSIsIlJPTEVfRlVTSU9OIiwiUk9MRV9BVVRIIiwiUk9MRV9EWFFVQU4iLCJST0xFX0RYTlVNWk5YIiwiUk9MRV9TV0YiLCJST0xFX0xBQkVMIl0sImNsaWVudF9pZCI6ImR4bnVtIiwiYXVkIjpbImhucmFkaW8tcmVzb3VyY2UiXSwidXNlcl9pZCI6MTYwNDQyMDM1NDQ4Mzg4ODEzMCwidXNlcl9pZF9zdHIiOiIxNjA0NDIwMzU0NDgzODg4MTMwIiwicGF5bG9hZCI6e30sInNjb3BlIjpbInJlYWQiXSwibmlja25hbWUiOiLnlKjmiLdfMTY3MTM1ODU5NTg1NSIsImR4QWNjb3VudElkIjoiMTk2NjAyOTgxODY4MjA5MzU3MCIsImV4cCI6MTc1NzY1OTQxMCwianRpIjoiYTY0YmE1OGMtM2RmOC00ZDFiLWJiZmEtMmU1NzdkNzlkMTZmIn0.pIlHXRQwJlQP8NzKEbXq0kidG55CUXEo0-1ERlqYTXHKT93u6by5w07kL8mV9VEtWhKD5nX2yrdhy7TbXM9dVGBDz4RUoHL_klJP1j-vw9xOLJVakpIOsK7WccobdrVOoarUhvHami6p6caeB9qvzY2IcSXrhxcWV4fpyIiOfOFLu_14uzMVzTZ-qHGaSa1EKm0c8kRTPL3GApV8sFinEcoE4bA6awGmR2yPpCXwe41d-B8ElZlQBmR9h9Q7-b8GEx7AUtFswplybN9CwFgnZLsrfkUqaH48gncx6OBmntpnbDgi679SulMCWM_fSntygUatbRH6xPuxUXQWw9JiBw');
`;

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
  const progs = programmeList.map(e => e.firstChild)
  .filter(e => !e.matches('.trailer'));
  const live = progs
  .find(e => e.matches('.live')) ?? progs.at(-1);
  console.log(live)
  live?.click();

  style.remove();
  document.querySelector('video')?.play();

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
    z-index: 999999999 !important;
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

const jsChannels = [
  '江苏卫视',
  '江苏城市',
  '江苏影视',
  '江苏综艺',
  '江苏新闻',
  '江苏教育',
  '体育休闲',
  '优漫卡通',
  '江苏国际',
];

const jsCode = (name: string) => `
[...document.querySelectorAll('audio, video')].forEach(el => el.muted = true)
const style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule('video { visibility: hidden; }', 0);
[...document.querySelectorAll('audio, video')].forEach(el => el.muted = true)



function change(name) {
  const list = document.querySelector('#programMain .swiper-wrapper');
  console.log(list);
  const item = [...list.children].map(e => e.querySelector(' .title')).find(e => {
    console.log(e)
    return e.innerText.includes(name);
  });
  item.click();

  setTimeout(() => {
  style.remove();

  const style2 = document.createElement('style');
  document.head.appendChild(style2);
  style2.sheet.insertRule('* { width: 0 !important; height: 0!important; padding: 0!important; overflow: hidden!important }', 0);
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

  document.querySelector('.xgplayer-volume .xgplayer-icon')?.click();
  }, 1000)
};

setTimeout(() => {
  change('${name}')
}, 1000)
`;

const jsChannelList = jsChannels.map(channel => {
  return {
    name: channel,
    url: 'https://live.jstv.com/',
    code: jsCode(channel),
  };
});

const hbChannels = [
  '河北卫视',
  '经济生活',
  '农民频道',
  '河北都市',
  '河北影视剧',
  '少儿科教',
  '文旅·公共',
  // '三佳购物',
];

const hbList = hbChannels.map((name, i) => ({
  name,
  url: `https://www.hebtv.com/19/19js/st/xdszb/index.shtml?index=${i}`,
  code: `const style2 = document.createElement('style');
  document.head.appendChild(style2);
  style2.sheet.insertRule('* { width: 0 !important; height: 0!important; padding: 0!important; overflow: hidden!important }', 0);
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
  }\`, 0);`,
}));

const hubeiChannels = [
  { name: '湖北卫视', url: '/app/tv/431' },
  { name: '湖北经视', url: '/app/tv/432' },
  { name: '湖北综合', url: '/app/tv/433' },
  { name: '湖北公共', url: '/app/tv/434' },
  { name: '湖北影视', url: '/app/tv/435' },
  { name: '湖北生活', url: '/app/tv/436' },
  { name: '湖北教育', url: '/app/tv/437' },
  { name: '湖北垄上', url: '/app/tv/438' },
];

const hubeiList = hubeiChannels.map((channel, i) => ({
  name: channel.name,
  url: 'https://news.hbtv.com.cn' + channel.url,
  code: `
  setTimeout(() => {
    if (document.querySelector('video')?.paused) {
      document.querySelector('.prism-big-play-btn')?.click();
    }
    const style2 = document.createElement('style');
  document.head.appendChild(style2);
  style2.sheet.insertRule('* { width: 0 !important; height: 0!important; padding: 0!important; overflow: hidden!important }', 0);
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
    transform: none !important;
  }\`, 0);
  }, 2000)
  `,
}));

const sdChannels = [
  { name: '山东卫视', url: 'iqilu.com/live/sdtv/' },
  { name: '齐鲁频道', url: 'iqilu.com/live/qlpd/' },
  { name: '体育频道', url: 'iqilu.com/live/typd/' },
  { name: '生活频道', url: 'iqilu.com/live/shpd/' },
  { name: '综艺频道', url: 'iqilu.com/live/zypd/' },
  { name: '新闻频道', url: 'iqilu.com/live/ggpd/' },
  { name: '农科频道', url: 'iqilu.com/live/nkpd/' },
  { name: '文旅频道', url: 'iqilu.com/live/yspd/' },
  { name: '少儿频道', url: 'iqilu.com/live/sepd/' },
];

const sdList = sdChannels.map((channel, i) => ({
  name: channel.name,
  url: 'https://v.' + channel.url,
  code: `
  const style2 = document.createElement('style');
  document.head.appendChild(style2);
  style2.sheet.insertRule('* { width: 0 !important; height: 0!important; padding: 0!important; overflow: hidden!important }', 0);
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
  `,
}));

export const channels: {
  name: string;
  url: string;
  code: string;
  startCode?: string;
}[] = [
    ...[
      { name: 'CCTV-1 综合', url: 'https://tv.cctv.com/live/cctv1/' },
      { name: 'CCTV-2 财经', url: 'https://tv.cctv.com/live/cctv2/' },
      { name: 'CCTV-3 综艺', url: 'https://tv.cctv.com/live/cctv3/' },
      { name: 'CCTV-4 中文国际（亚）', url: 'https://tv.cctv.com/live/cctv4/' },
      { name: 'CCTV-5 体育', url: 'https://tv.cctv.com/live/cctv5/' },
      { name: 'CCTV-5+ 体育赛事', url: 'https://tv.cctv.com/live/cctv5plus/' },
      { name: 'CCTV-6 电影', url: 'https://tv.cctv.com/live/cctv6/' },
      { name: 'CCTV-7 国防军事', url: 'https://tv.cctv.com/live/cctv7/' },
      { name: 'CCTV-8 电视剧', url: 'https://tv.cctv.com/live/cctv8/' },
      { name: 'CCTV-9 纪录', url: 'https://tv.cctv.com/live/cctvjilu/' },
      { name: 'CCTV-10 科教', url: 'https://tv.cctv.com/live/cctv10/' },
      { name: 'CCTV-11 戏曲', url: 'https://tv.cctv.com/live/cctv11/' },
      { name: 'CCTV-12 社会与法', url: 'https://tv.cctv.com/live/cctv12/' },
      { name: 'CCTV-13 新闻', url: 'https://tv.cctv.com/live/cctv13/' },
      { name: 'CCTV-14 少儿', url: 'https://tv.cctv.com/live/cctvchild/' },
      { name: 'CCTV-15 音乐', url: 'https://tv.cctv.com/live/cctv15/' },
      { name: 'CCTV-16 奥林匹克', url: 'https://tv.cctv.com/live/cctv16/' },
      { name: 'CCTV-17 农业农村', url: 'https://tv.cctv.com/live/cctv17/' },
      {
        name: 'CCTV-4 中文国际（欧）',
        url: 'https://tv.cctv.com/live/cctveurope/index.shtml',
      },
      {
        name: 'CCTV-4 中文国际（美）',
        url: 'https://tv.cctv.com/live/cctvamerica/',
      },
    ].map(e => ({ ...e, code: cctvCode })),
    ...hnChannels.map(name => ({
      name,
      url: 'https://static.hntv.tv/kds/#/',
      code: hnCode(name),
      startCode: hnStartCode,
    })),
    ...jsChannelList,
    ...hbList,
    ...hubeiList,
    ...sdList,
  ];
