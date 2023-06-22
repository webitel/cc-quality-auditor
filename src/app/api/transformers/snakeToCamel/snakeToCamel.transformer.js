import { objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

const snakeToCamelTranformer = (skipKeys) => (obj) => objSnakeToCamel(skipKeys, obj);
export default snakeToCamelTranformer;
