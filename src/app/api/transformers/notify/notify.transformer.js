import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

const notifyTransformer = (payload) => {
  if (payload instanceof Error) {
    eventBus.$emit('notification', {
      type: 'error',
      text: payload.response.data.detail || payload.response.data.message,
    });
  }
  return payload;
};

export default notifyTransformer;
