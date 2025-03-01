const captureScreenshot = async () => {
    try {
      // अगर पहले से स्क्रीन शेयरिंग चालू नहीं है, तो इसे स्टार्ट करें
      if (!mediaStream) {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      }

      const track = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();

      // Canvas पर इमेज सेट करें
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      // Blob में कन्वर्ट करें
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        const formData = new FormData();
        formData.append("image", blob, "screenshot.png");

        // बैकएंड API को भेजें
        await fetch("http://localhost:5000/api/screenshot", {
          method: "POST",
          body: formData,
        });
      }, "image/png");
    } catch (error) {
      console.error("Screenshot error:", error);
    }
  };