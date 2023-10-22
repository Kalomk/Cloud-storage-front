import { useImperativeHandle, forwardRef, useState } from 'react';

const ProgressBar: React.ForwardRefRenderFunction<HTMLDivElement, { path: string }> = (
  { path },
  ref: React.Ref<HTMLDivElement>
) => {
  const [progress, setProgress] = useState<number>(0);

  const getVideoBlob = (data: Uint8Array[], contentType: string) => {
    try {
      // Create a Blob from the response data
      return new Blob(data, { type: contentType });
    } catch (error) {
      console.error('Error creating video blob:', error);
    }
  };

  const fetchProgress = async () => {
    const { body, headers } = await fetch(path);

    if (!body) return;

    const contentLength = headers.get('Content-Length');
    const totalLength = typeof contentLength === 'string' && parseInt(contentLength);
    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let receivedLength = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // Create a Blob from the accumulated chunks and specify the content type
        const videoBlob = getVideoBlob(chunks, headers.get('Content-Type') || 'video/mp4');
        const videoUrl = URL.createObjectURL(videoBlob!);
        return videoUrl;
      }

      chunks.push(value);
      receivedLength += value.length;

      if (typeof totalLength === 'number') {
        const step = (receivedLength / totalLength) * 100;
        setProgress(step);
      }
    }
  };

  const resetProgress = () => {
    setProgress(0);
  };

  useImperativeHandle<HTMLDivElement, any>(ref, () => ({
    fetchProgress,
    resetProgress,
  }));

  return (
    <div className={`block relative w-full h-2 overflow-hidden`}>
      <div
        className={`block absolute h-full w-full top-0 left-0 bg-blue-600 transition-[left] ${
          progress > 100
            ? 'animate-faderight bg-[length:400%] bg-gradient-to-r-[(color-blue-500)] to-[70%]'
            : ''
        }`}
        style={{ left: `-${100 - progress}%` }}
      ></div>
    </div>
  );
};

export default forwardRef(ProgressBar);
