import Image from 'next/image';
import axios from '../../../core/axios';

const ImageFile = ({ fileName }: { fileName: string }) => {
  const imageUrl = `${axios.defaults.baseURL}/uploads/${fileName}`;

  return (
    <Image
      className="rounded-[5px] object-cover"
      src={imageUrl}
      priority={true}
      alt="file"
      width={150}
      height={150}
    />
  );
};

export default ImageFile;
