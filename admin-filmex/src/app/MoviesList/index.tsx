'use client'
import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
export interface MovieType {
    id;number,
    title:string,
    poster_path:string,
    overview:string,
    vote_average:number,
}


export default function MovieList() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    useEffect(() => {
        getMovies();
    }, []);
    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '3aae4e59ee042d41895da5b9ebf3b3a1',
                language: 'pt-BR'
            }
        }).then(response => {
            console.log(response);
            setMovies(response.data.results);
        }).catch(error => {
            console.error('Error fetching movies:', error);
        });
    };

    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <li key={movie.id} className='movie-card' key={movie.id}>
                    <p>{movie.title}</p>
                    <p className="description">{movie.overview}</p>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <p>
                        {movie.vote_average}
                    </p>
                </li>
            ))}
        </ul>
    );
}
