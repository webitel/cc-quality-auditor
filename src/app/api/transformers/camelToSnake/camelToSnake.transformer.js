import { objCamelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';

const camelToSnakeTranformer = (skipKeys) => (obj) => objCamelToSnake(skipKeys, obj);
export default camelToSnakeTranformer;
