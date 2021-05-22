import React from 'react';

interface IHeader {
  title: string;
  description?: string;
  image?: string;
}

export const Header = ({
  title,
  description,
  image
}: IHeader) => (
  <div className="relative bg-yellow-500">
    <div className="absolute inset-0">
      {image && (
        <img
          className="w-full h-full object-cover"
          src={image}
          alt=""
        />
      )}
      <div className="absolute inset-0 bg-yellow-600 mix-blend-multiply" aria-hidden="true" />
    </div>
    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
      {title && (<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>)}
      {description && (<p className="mt-6 text-xl text-indigo-100 max-w-3xl">{description }</p>)}
    </div>
  </div>
);
