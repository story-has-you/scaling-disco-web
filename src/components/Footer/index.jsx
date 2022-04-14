import {DefaultFooter} from '@ant-design/pro-layout';

const Footer = () => {
  const defaultMessage = '[故事有你]';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
    />
  );
};

export default Footer;
