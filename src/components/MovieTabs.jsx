import React from "react";

const MovieTab = (props) => {
    const { updateSortBy} = props;
    // Оптимизация функций
    // handleClick - возвращаем функцию, т.е ссылку на неё, а не результат
    const handleClick = value => {
        return () => {
            updateSortBy(value)    
        }
    }
    // А здесь просто возвращаем строчку в имя класса , чтобы текст не пух
    const getClassLink = (value) => {
        return `nav-link ${
            props.sort_by === value ? "active": ""
        }
        `
    }
    return (
        <ul className="tabs nav nav-pills">
            <li className="nav-item">
                <div 
                    // className={`nav-link ${
                    // props.sort_by === "popularity.desc" ? "active": ""
                    //}`}
                className={getClassLink("popularity.desc")}    
//               onClick={updateSortBy.bind(null,"popularity.desc")}
                onClick={handleClick("popularity.desc")}
                >
                Popularity desc
                </div>
            </li>
            <li className="nav-item">
                <div 
                className={getClassLink("revenue.desc")}
                onClick={updateSortBy.bind(null,"revenue.desc")}
                >
                Revenue desc
                </div>
            </li>
            <li className="nav-item">
            <div 
                className={getClassLink("vote_average.desc")}
                onClick={updateSortBy.bind(null,"vote_average.desc")}                
                >
                Vote average desc
                </div>
            </li>
        </ul>
    )

}

export default MovieTab