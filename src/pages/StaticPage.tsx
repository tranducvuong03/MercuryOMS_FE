import { Link } from "react-router-dom"
import "./StaticPage.css"

type StaticPageProps = {
  title: string
  subtitle?: string
  description: string
  highlights?: string[]
  actions?: Array<{ label: string; to: string }>
}

const StaticPage = ({
  title,
  subtitle,
  description,
  highlights = [],
  actions = [],
}: StaticPageProps) => {
  return (
    <div className="static-page">
      <div className="static-page__container">
        <p className="static-page__eyebrow">Mercury</p>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        <p className="static-page__description">{description}</p>

        {highlights.length > 0 && (
          <ul className="static-page__list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {actions.length > 0 && (
          <div className="static-page__actions">
            {actions.map((action) => (
              <Link key={action.to} to={action.to} className="static-page__action">
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StaticPage
