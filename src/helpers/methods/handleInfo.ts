import { FilmProps } from '../types/film';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


export const handleInfo = (film: FilmProps): FilmProps => {
  const formatted = format(parseISO(film.release_date), "eeee',' dd 'de' MMMM 'de' yyyy", {
    locale: ptBR
  });

  alert(`${film.title} was released in ${formatted}`);

  return {
    episode_id: film.episode_id,
    title: film.title,
    release_date: formatted
  }
}
