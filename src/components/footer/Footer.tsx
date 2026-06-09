import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div>
      사용 안내. 문의 할수있는곳
      <Image src="/images/러브볼.png" alt="footer-logo" width={100} height={100} />
    </div>
  );
};

export default Footer;