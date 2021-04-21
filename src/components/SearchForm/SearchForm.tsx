import React, { useState } from 'react';
import { getCoordsByName } from '../../services';
import './SearchForm.css';

interface SearchProps{
    OnHandleForm: () => void,
    OnClickForm: (name: string) => void
}

const SearchForm: React.FC<SearchProps> = ({OnHandleForm, OnClickForm}) =>{
    const [cities, setCities] = useState<any[]>([]);

    const handleSubmit = (label: string) => {
        OnClickForm(label)
        OnHandleForm();
    }

    const OnChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const fetchData = async () => {
            setCities(getCities((await getCoordsByName(e.currentTarget.value)).data));
        }

        if(e.currentTarget.value.length > 2){
            fetchData();
        } 
        
        if(e.currentTarget.value.length === 0 || e.currentTarget.value.length < 2) {
            setCities([]);
        }
    }

    const getCities = (cities: any[]): JSX.Element[] => {
        return cities.map(({label}, index)=> {
            return  (
                <li className="search-item" key={index} onClick={() => handleSubmit(label)}>
                    <span>{label}</span>
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
                {cities}
            </ul>
            <i className="far fa-times close"  onClick={() => OnHandleForm()}></i>
        </>
    );
}

export {SearchForm};