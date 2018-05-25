export default () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const orientation =  (height > width) ? 'mobile' : 'desktop';
return orientation;
}
