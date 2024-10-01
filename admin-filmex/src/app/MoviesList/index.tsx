'use client'
import { useEffect, useState } from 'react';
import "./index.scss";
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        getMovies(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && !isLoadingMore) {
                setIsLoadingMore(true);
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoadingMore]);

    const getMovies = async (page: number) => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'pt-BR',
                    page: page,
                }
            });

            setMovies(prevMovies => [...prevMovies, ...response.data.results]);
            setIsLoading(false);
            setIsLoadingMore(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
            </div>
        );
    }

    return (
        <div className='movie-list'>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            {isLoadingMore && (
                <div className='loading-container'>
                    <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
                </div>
            )}
        </div>
    );
}
