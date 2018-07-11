export default () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  if (width > 450 && height > 450) {
    return 'desktop';
  } else {
    return 'mobile'
  };
};
