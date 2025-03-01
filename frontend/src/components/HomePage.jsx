import { Monitor, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useShotStore } from "../store/useShotStore";

export default function HomePage() {
  const [medieStream, setMedieStream] = useState(null)
  const {  sendShot } = useShotStore();

  useEffect(() => {
    if(medieStream) return
    const startCapturing = async() => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
        setMedieStream(stream)
      } catch (error) {
        console.log(error)
      }
    }
    startCapturing()
  },[])

  useEffect(() => {
    if (!medieStream) return;

    
    const captureScreenshot = async () => {
      try {
        const track = medieStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const bitmap = await imageCapture.grabFrame();

        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (!blob) return console.log("Blob creation failed");

          const formData = new FormData();
          formData.append("screenshot", blob, "screenshot.png");

          await sendShot(formData);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(captureScreenshot, 30000);
  }, [medieStream]);

  return (
    <div className="bg-white min-h-screen text-[#333333]">
      <header className="text-center py-16 bg-[#F8F4FF]">
        <h1 className="text-4xl font-bold font-montserrat text-[#4B0082]">
          Track Your Users in Real Time
        </h1>
        <p className="text-lg mt-4 font-open-sans max-w-2xl mx-auto">
          Our system captures user screens every 30 seconds, providing a
          detailed insight into their activities.
        </p>
        <button className="mt-6 bg-[#6A0DAD] hover:bg-[#8A2BE2] text-white font-montserrat-semiBold px-6 py-3 rounded-lg">
          Get Started
        </button>
      </header>
    </div>
  );
}
