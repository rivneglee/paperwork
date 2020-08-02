const profileKey = process.env.NODE_ENV;

export default () => {
  return require(`./profiles/${profileKey}`).default;
};
