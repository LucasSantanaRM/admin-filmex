'use client'
import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';

export default function MovieList() {
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        getMovies();
    },[])
    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key:'3aae4e59ee042d41895da5b9ebf3b3a1',
                language: 'pt-BR'
            }

        }).then(response =>{
            console.log(response);
            setMovies(response.data.results)
        })
    }






    return (

        <ul className="movie-list">

            {movies.map((movie) =>
            
            <li>
                {movie.title}
            </li>
            
            )}

           
        </ul>


    );



}