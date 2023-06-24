import { objCamelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';

const camelToSnakeTransformer = (skipKeys) => (obj) => objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
