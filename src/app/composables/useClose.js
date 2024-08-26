import { useRouter } from 'vue-router';

// eslint-disable-next-line import/prefer-default-export
export const useClose = () => {
  const router = useRouter();

  function close(routeName) {
    // Need to close the tab if you moved from another application
    // https://webitel.atlassian.net/browse/WTEL-4575

    if(window.history.length === 1) window.close();
    router.push({name: routeName});
  }

  return { close };
};
