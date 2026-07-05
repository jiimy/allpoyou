import React from 'react';
import s from './footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.brand}>
          <p className={s.brandName}>올포유</p>
          <p className={s.brandDesc}>포켓몬 팀 빌드 · 도감 · 기술 검색</p>
        </div>

        <nav className={s.links} aria-label="푸터 링크">
          <a
            className={s.link}
            href="https://buly.kr/7mDuxOD"
            target="_blank"
            rel="noopener noreferrer"
          >
            사용 안내
          </a>
          <a
            className={`${s.link} ${s.linkDiscord}`}
            href="https://discord.gg/8Mw6uYxc9"
            target="_blank"
            rel="noopener noreferrer"
          >
            문의하기 (디스코드)
          </a>
        </nav>
      </div>

      <div className={s.footerBottom}>
        <p className={s.copyright}>© {year} 올포유</p>
      </div>
    </footer>
  );
};

export default Footer;
