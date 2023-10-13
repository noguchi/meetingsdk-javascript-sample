ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

var authEndpoint = "http://localhost:4000";
var sdkKey = "T3_aSq5mQhqAP5_UpjleGQ";
var meetingNumber = "75454679404";
var passWord = "bw1Uvk";
var role = 0;
var userName = "from js client";
var userEmail = "";
var registrantToken = "";
var zakToken = "";
var leaveUrl = "https://zoom.us";

function getSignature() {
  fetch(authEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      startMeeting(data.signature);
    })
    .catch((error) => {
      console.log(error);
    });
}

function startMeeting(signature) {
  document.getElementById("zmmtg-root").style.display = "block";

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success);
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        success: (success) => {
          console.log(success);
        },
        error: (error) => {
          console.log(error);
        },
      });
    },
    error: (error) => {
      console.log(error);
    },
  });
}
