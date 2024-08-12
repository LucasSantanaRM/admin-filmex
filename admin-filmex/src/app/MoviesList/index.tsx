'use client'
import { useEffect, useState } from 'react';
import "./index.scss";
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';
import { DiLaravel } from 'react-icons/di';


export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
       await axios({
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

        setIsLoading(false)

    };

if (isLoading) {
    return (
        <div className='loading-container'>
            <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
        </div>
    )
}



    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                  movie={movie}
                />
            ))}
        </ul>
    );
}
