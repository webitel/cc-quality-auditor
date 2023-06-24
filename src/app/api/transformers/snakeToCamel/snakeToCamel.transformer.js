import { objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

const snakeToCamelTransformer = (skipKeys) => (obj) => objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
