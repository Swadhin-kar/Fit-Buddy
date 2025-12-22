import React, { useEffect, useState } from "react";

const Card = ({ data }) => {
    return (
        <div
            className="card bg-base-100 w-full max-w-xs mx-auto transition-all duration-300 hover:-translate-y-1
    shadow-[0_2px_10px_rgba(72,72,72,0.95)]
    hover:shadow-[0_4px_20px_rgba(72,72,72,1)]"
        >

            <figure className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover rounded"
                >
                </img>
            </figure>

            <div className="card-body">
                <span className="card-title text-xl">{data.title}</span>
                <p>{data.description}</p>
                <div className="card-actions justify-end"></div>
            </div>
        </div>
    );
};

export default Card;
