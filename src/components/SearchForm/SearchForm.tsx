import React, { useState } from 'react';
import { getCoordsByName } from '../../services';
import './SearchForm.css';

interface ISearchForm{
    color: string
    onHandleForm: () => void,
    onClickItem: (name: string) => void,
}

const SearchForm: React.FC<ISearchForm> = ({color, onHandleForm, onClickItem}) =>{
    const [cities, setCities] = useState<any[]>([]);

    const handleSubmit = (coords: any) => {
        onClickItem(coords);
        onHandleForm();
    }

    const OnChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const fetchData = async () => {
            const { features } = await getCoordsByName(e.currentTarget.value);
            setCities(features);
        }

        if(e.currentTarget.value.length > 2){
            fetchData();
        } 
        
        if(e.currentTarget.value.length === 0 || e.currentTarget.value.length < 2) {
            setCities([]);
        }
    }

    const getCities = (cities: any[]): JSX.Element[] => {
        return cities.map(({properties: {city, lat, lon}}, index)=> {
            return  (
                <li className={`search-item ${color}`} 
                    key={index} 
                    onClick={() => handleSubmit({lat, lon})}>
                        <span>{city}</span>
                    <i className="far fa-chevron-right"></i>
                </li>
            )
        });
    }

    return (
        <>
            <input className="search-input" 
                    placeholder="Search location" 
                    name="search" 
                    type="text"
                    autoComplete="off"
                    onChange={(e) => OnChangeValue(e)} />
            <ul className="search-list">
                { getCities(cities) }
            </ul>
            <i className={`far fa-times close ${color}`}  
                onClick={() => onHandleForm()}></i>
        </>
    );
}

export { SearchForm };