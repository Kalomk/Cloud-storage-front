// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useSelectedFiles } from '../Files/FilesProvider';

const PdfReader = () => {
  const { currentPlay } = useSelectedFiles();
  const newPlugin = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          height: '500px',
        }}
      >
        <Viewer fileUrl={currentPlay.path} plugins={[newPlugin]} />
      </div>
    </Worker>
  );
};

export default PdfReader;
