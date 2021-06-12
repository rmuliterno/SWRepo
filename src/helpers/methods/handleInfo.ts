import { FilmProps } from '../types/film';

export const handleInfo = (film: FilmProps): FilmProps => {
  alert(`${film.title} was released in ${film.release_date}`)
  return {
    episode_id: film.episode_id,
    title: film.title,
    release_date: film.release_date
  }
}
