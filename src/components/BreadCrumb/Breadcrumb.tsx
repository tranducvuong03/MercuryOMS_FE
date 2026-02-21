import { Link } from "react-router-dom"
import { MdChevronRight } from "react-icons/md"
import type { BreadcrumbItem } from "../../types/breadcrumb"

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index !== 0 && <MdChevronRight className="icon" />}
          
          {item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            <span className="current">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb