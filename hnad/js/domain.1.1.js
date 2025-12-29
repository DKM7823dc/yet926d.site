var f = true
var timeOutEvent = 0
var whaStr = ""
var wx = ""
var line = ""
var kakaoVal = ""
var la51 = ""
var pixel = ""
var domain_id = 288
var auto_reply_content = ""

function gtouchstart() {
  timeOutEvent = setTimeout("longPress()", 500)
  return false
}
function gtouchend() {
  clearTimeout(timeOutEvent)
  return false
}
function gtouchmove() {
  clearTimeout(timeOutEvent)
  timeOutEvent = 0
}
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return ""
}
$(document).ready(function () {
  domain_id = getUrlParam("domain_id")
  if (domain_id === "") {
    console.log("domain_id:" + domain_id)
    return false
  }
  $.ajax({
    type: "POST",
    async: true,
    url: "https://adsmanager.masaosato.com/index/index/account",
    data: {
      id: domain_id,
    },
    dataType: "json",
    success: function (k) {
      if (k.code == 200) {
        whaStr = k.res["whatsapp"]
        line = k.res["line"]
        wx = k.res["wechat"]
        kakaoVal = k.res["kakao"]
        la51 = k.res["la51"]
        la51_arr = k.res["la51_arr"]
        pixel = k.res["pixel"]
        pixel_arr = k.res["pixel_arr"]
        domain_check_key = k.res["domain_check_key"]
        auto_reply_content = k.res["auto_reply_content"]
        console.log(pixel_arr, la51_arr, domain_check_key)
        console.log("kakao:" + kakaoVal)
        console.log("whatsapp:" + whaStr)
        console.log("line:" + line)
        console.log("wechat:" + wx)
        console.log("auto_reply_content:" + auto_reply_content)

        $("head").append(
          '<meta name="facebook-domain-verification" content="' +
            domain_check_key +
            '" />'
        )

        if (line && line.length > 0) {
          $(".btn_line_box").append(
            '<a class="linebtn" name="lineNo" onclick="lineNo()" href="line://ti/p/~' +
              line +
              '" >Line</a>'
          )
        }
        try {
          if (pixel_arr && pixel_arr.length > 0) {
            jQuery.each(pixel_arr, function (index, item) {
              $("head").append(
                "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init'," +"'"+
                  item +"'"+
                  ");fbq('track', 'PageView');fbq('track', 'ViewContent');</script><noscript><img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://www.facebook.com/tr?id=" +
                  "'"+item +"'"+
                  '&ev=PageView&noscript=1" /></noscript>'
              )
            })
          }
        } catch (e) {
          console.log(e)
        }
        try {
          if (la51_arr && la51_arr.length > 0) {
            jQuery.each(la51_arr, function (index, item) {
              LA.init({ id: item, ck: item })
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
  })
})
setTimeout(function () {
  var e = ""
  var d = getCookie("hello_byi_name")
  console.log(d, e)
  if (d == "" || d == null) {
    var b = "helloA1"
    setCookie("hello_byi_name", b, 0.5)
    var a = domain_id
    var c = window.location.href
    $.ajax({
      type: "POST",
      async: true,
      url: "https://adsmanager.masaosato.com/index/index/hello",
      data: {
        wechat_id: a,
        cur_url: c,
        word: key,
        region: e,
      },
    })
  }
}, 1000)

function wha() {
  console.log(whaStr);
  clickReport(whaStr);

  // 检查是否在移动设备上
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // 移动设备上的 WhatsApp 链接
    window.location.href =
      "whatsapp://send?phone=" + whaStr + "&text=" + auto_reply_content;
  } else {
    // 非移动设备上的 WhatsApp 网页版链接
    window.location.href =
      "https://api.whatsapp.com/send/?phone=" + whaStr + "&text=" + encodeURIComponent(auto_reply_content) + "&type=phone_number&app_absent=0";
  }
}

function lineNo() {
  console.log(line)
  clickReport(line)
}
function copythewx() {
  let oInput = document.createElement("input")
  oInput.value = wx
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand("Copy")
  oInput.style.display = "none"
  document.body.removeChild(oInput)
  clickReport(wx)
  alert("已復制微信號")
  window.location.href = "weixin://"
}

function whag() {
    console.log("ws群组："+whaStr);
  clickReport(whaStr)
  window.location.href = "https://chat.whatsapp.com/" + whaStr
}

function showline() {
  clickReport(line);

  if (line.startsWith('@')) {
    window.location.href = "https://line.me/R/ti/p/" + line;
  } else {
    window.location.href = "https://lin.ee/" + line;
  }
}

function showline2() {
  clickReport(line)
  window.open("https://line.me/ti/p/" + line)
//   window.open("https://lin.ee/" + line)
//   window.location.href = "https://lin.ee/" + line
}
function kakao() {
  clickReport(kakaoVal)
  window.location.href = "http://pf.kakao.com/" + kakaoVal + "/chat"
}

var start_a
var end_a
var duration_a = 0
start_a = new Date()
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  var search = [
    ["sogou.com", "keyword"],
    ["sm.cn", "q"],
    ["so.com", "q"],
    ["baidu.com", "word"],
  ]
} else {
  var search = [
    ["sogou.com", "query"],
    ["so.com", "q"],
    ["baidu.com", "wd"],
  ]
}
var url = document.referrer
var key = getKey(decodeURI(url))
$("#key").html(key)
function wechat() {
  var e = returnCitySN["cname"]
  var c = window.location.href
  var b = $("#word_wx").text()
  var a = $("#domain_id").text()
  end_a = new Date()
  duration_a = end_a.getTime() - start_a.getTime()
  duration_a = duration_a / 1000
  duration_a = Math.round(duration_a)
  if (duration_a > 15) {
    if (f) {
      f = true
      $.ajax({
        url: "https://adsmanager.masaosato.com/index/index/wechat",
        type: "POST",
        async: true,
        data: {
          wechat: b,
          wechat_id: a,
          kan_time: duration_a,
          cur_url: c,
          word: key,
          region: e,
        },
        dataType: "json",
        success: function (d) {
          console.log(d)
        },
      })
    }
  }
  f = false
}
function clickReport(accountNo) {
  var c = window.location.href
  end_a = new Date()
  duration_a = end_a.getTime() - start_a.getTime()
  duration_a = duration_a / 1000
  duration_a = Math.round(duration_a)
  if (duration_a > 10) {
    if (f) {
      f = true
      $.ajax({
        url: "https://adsmanager.masaosato.com/index/index/wechat",
        type: "POST",
        async: true,
        data: {
          wechat: accountNo,
          wechat_id: domain_id,
          kan_time: duration_a,
          cur_url: c,
        },
        dataType: "json",
        success: function (d) {
          console.log(d)
        },
      })
    }
  }
  f = false
}
function longPress() {
  timeOutEvent = 0
  var e = returnCitySN["cname"]
  var c = window.location.href
  var b = $("#word_wx").text()
  var a = $("#domain_id").text()
  end_a = new Date()
  duration_a = end_a.getTime() - start_a.getTime()
  duration_a = duration_a / 1000
  duration_a = Math.round(duration_a)
  if (duration_a > 15) {
    if (f) {
      f = true
      $.ajax({
        url: "https://adsmanager.masaosato.com/index/index/wechat",
        type: "POST",
        async: true,
        data: {
          wechat: b,
          wechat_id: a,
          kan_time: duration_a,
          cur_url: c,
          word: key,
          region: e,
        },
        dataType: "json",
        success: function (d) {
          console.log(d)
        },
      })
    }
  }
  f = false
}
function getKey(a) {
  var c = getSearch(a)
  var b = getQueryString(a, c)
  return b
}
function getSearch(a) {
  var c = []
  for (var b = 0; b < search.length; b++) {
    if (a.indexOf(search[b][0]) > -1) {
      c = search[b][1]
    }
  }
  return c
}
function getQueryString(b, a) {
  var b = b.substr(b.indexOf("?") + 1)
  var c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i")
  var d = b.match(c)
  if (d != null) {
    return unescape(d[2])
  }
  return null
}
function setCookie(b, g, c) {
  var e = new Date()
  e.setTime(e.getTime() + c * 24 * 60 * 60 * 1000)
  var a = "expires=" + e.toGMTString()
  document.cookie = b + "=" + g + "; " + a
}
function getCookie(d) {
  var b = d + "="
  var a = document.cookie.split(";")
  for (var e = 0; e < a.length; e++) {
    var g = a[e].trim()
    if (g.indexOf(b) == 0) {
      return g.substring(b.length, g.length)
    }
  }
  return ""
}
