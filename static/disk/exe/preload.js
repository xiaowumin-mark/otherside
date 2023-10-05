// preload.js
document.addEventListener('DOMContentLoaded', (event) => {
  // 页面内容加载之后需要引入的一些操作

  try {
    document.getElementById('toptb').remove()
    document.getElementById('hd').remove()


    document.getElementsByTagName('body').style.display = "none"
  } catch (_) { }
  



})