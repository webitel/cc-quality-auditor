import deepcopy from 'deep-copy';
import get from 'lodash/get';
import updateObject from '@webitel/ui-sdk/src/scripts/updateObject';

const starToSearchTransformer = (path) => (params) => {
  const copy = deepcopy(params);
  const value = get(copy, path);
  if (value && value.slice(-1) === '*') return copy;
  return updateObject({ obj: copy, path, value: `${value}*` });
};

export default starToSearchTransformer;
