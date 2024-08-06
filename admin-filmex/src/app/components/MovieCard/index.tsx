import { Movie } from "@/types"

export interface Props {
    movie: Movie
}

export default function MovieCard(props: Props) {
    const movie = props.movie;

return(
    
        <li key={movie.id} className='movie-card' key={props.id}>
            <p>{movie.title}

            </p>
            <p className="description">
                {movie.overview}
                </p>
       

            <p>
                {movie.vote_average}
            </p>
        </li>
)


}