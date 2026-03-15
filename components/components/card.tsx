import { ReactElement } from "react";

export const Card = (props: {
  title: string;
  description?: string;
  thumbnail?: string;
  url?: string;
  date?: string;
  children?: ReactElement;
}) => {
  const { title, description, thumbnail, url, date, children } = props;
  return (
    <a href={url}>
      <div className="card border-1 w-100">
        {thumbnail && (
          <figure>
            <img src={thumbnail} alt={title} />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h3 className="text-sm text-gray-500">{description}</h3>
          <h3 className="card-content">{children}</h3>
        </div>
        {date && (
          <div className="text-sm text-gray-500 text-right px-2">{date}</div>
        )}
      </div>
    </a>
  );
};
