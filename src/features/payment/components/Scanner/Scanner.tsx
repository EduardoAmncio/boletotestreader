import React, { useEffect } from "react";
// import config from "./config.json";
//@ts-ignore
import Quagga from "quagga";

const Scanner = (props: any) => {

  const { onDetected } = props;
  const [backCamId, setBackCamId] = React.useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        let lastDevice = null;
        let someCamera = null;
        devices.forEach(function (device) {
          // //alert( JSON.stringify(device) );
          // console.log("here, one camera: ");
          // console.log(device);
          // console.log("------------------u");
          if (device.kind === "videoinput") {
            someCamera = device.deviceId;
            if (device.label.match(/back/) != null) {
              lastDevice = device.deviceId;
            }
          }

        });
        // alert(lastDevice);
        // alert(someCamera);
        let correctCamera = lastDevice || someCamera;
        setBackCamId(correctCamera);
      })
      .catch(function (err: any) {
        //alert(err.name + ": " + err.message);
      });
  }, []);


  useEffect(() => {
    //=====================
    // alert(backCamId);
    if (!backCamId) return;

    Quagga.init({
      inputStream: {
        type: "LiveStream",
        locator: true,
        constraints: {
          width: 1920,//{ min: 450 }
          height: 1080,//{ min: 300 }
          //facingMode: "environment",
          frequency: 10,
          deviceId: backCamId,
          aspectRatio: "4/3"//{ min: 3, max: 4 }
        }
      },

      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: ["i2of5_reader"] //
      },
      locate: true
    }, (err: any) => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop();
      }
    });
    //=====================
    //detecting boxes on stream
    Quagga.onProcessed((result: any) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box: any) {
              return box !== result.box;
            })
            .forEach(function (box: any) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "#000",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, [backCamId]);

  const detected = (result: any) => {
    onDetected(result.codeResult.code);
  };

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
