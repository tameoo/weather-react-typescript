import React, { useState } from 'react';
import { getCoordsByName } from '../../services';
import './SearchForm.css';

interface SearchProps{
    OnHandleForm: () => void,
    OnClickForm: (name: string) => void
}

const SearchForm: React.FC<SearchProps> = ({OnHandleForm, OnClickForm}) =>{
    const [cities, setCities] = useState<any[]>([]);

    const handleSubmit = (coords: any) => {
        OnClickForm(coords);
        OnHandleForm();
    }

    const OnChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const fetchData = async () => {
          const {features} = await getCoordsByName(e.currentTarget.value);
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
                <li className="search-item" key={index} onClick={() => handleSubmit({lat, lon})}>
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
                {getCities(cities)}
            </ul>
            <i className="far fa-times close"  onClick={() => OnHandleForm()}></i>
        </>
    );
}

export {SearchForm};