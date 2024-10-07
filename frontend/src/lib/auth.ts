const POPUP_WIDTH = 400;
const POPUP_HEIGHT = 500;

const LEFT = window.innerWidth / 2 - POPUP_WIDTH / 2;
const TOP = window.innerHeight / 2 - POPUP_HEIGHT / 2;

export const googleLogin = () => {
  window.open(
    `${
      import.meta.env.DEV
        ? `${import.meta.env.VITE_DEV_API}/auth/google`
        : `${import.meta.env.VITE_PROD_API}/auth/google`
    }`,
    "",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${POPUP_WIDTH}, 
    height=${POPUP_HEIGHT}, top=${TOP}, left=${LEFT}`
  );
};
