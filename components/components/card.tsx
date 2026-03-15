import { ReactElement } from "react";

export const Card = (props: {
  title: string;
  description?: string;
  thumbnail?: string;
  url?: string;
  children?: ReactElement;
}) => {
  const { title, description, thumbnail, url, children } = props;
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
        </div>
        {children}
      </div>
    </a>
  );
};
