function checkIsIOS() {
  let userAgent = navigator.userAgent;
  let isIOS =!!userAgent.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/);
  return isIOS;
}
export default checkIsIOS;