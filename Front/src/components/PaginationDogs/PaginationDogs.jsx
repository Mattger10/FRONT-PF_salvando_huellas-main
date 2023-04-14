import React from 'react';

export default function PaginationDogs({DogPerPage, dogsData, paging}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dogsData/DogPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
        {pageNumbers?.map((number) => (
            <button key={number} onClick={() => paging(number)}>
                    {number}
            </button>
            ))}
        </div>
    );
}