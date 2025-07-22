import { createI18n } from 'vue-i18n';

import en from './en/en';
import es from './es/es';
import kz from './kz/kz';
import ro from './ro/ro';
import ru from './ru/ru';
import uk from './uk/uk';
import pl from './pl/pl';
import uz from './uz/uz';
import vi from './vi/vi';

const messages = {
  en,
  ru,
  uk,
  kz,
  es,
  ro,
  pl,
  uz,
  vi,
};

const locale = localStorage.getItem('lang') || 'en';
const fallbackLocale = localStorage.getItem('fallbackLang') || 'en';

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale,
  messages,
});
