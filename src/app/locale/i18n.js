import { createI18n } from 'vue-i18n';

import en from './en/en';
import es from './es/es';
import kz from './kz/kz';
import ro from './ro/ro';
import ru from './ru/ru';
import uk from './uk/uk';

const messages = {
  en,
  ru,
  uk,
  kz,
  es,
  ro,
};

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
