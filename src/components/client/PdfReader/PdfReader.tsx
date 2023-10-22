import React, { useRef, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfReader = ({ path }: { path?: string }) => {
  // const [numPages, setNumPages] = useState<null | number>(null);
  // const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  // function changePage(offset: number) {
  //   setPageNumber((prevPageNumber) => prevPageNumber + offset);
  // }

  // function previousPage() {
  //   changePage(-1);
  // }

  // function nextPage() {
  //   changePage(1);
  // }

  // return (
  //   <>
  //     <Document
  //       file={path}
  //       options={{ workerSrc: '/pdf.worker.js' }}
  //       onLoadSuccess={onDocumentLoadSuccess}
  //     >
  //       <Page pageNumber={pageNumber} />
  //     </Document>
  //     <div>
  //       <p>
  //         Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
  //       </p>
  //       <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
  //         Previous
  //       </button>
  //       <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
  //         Next
  //       </button>
  //     </div>
  //   </>
  // );
  <>dsffgds</>;
};

export default PdfReader;
