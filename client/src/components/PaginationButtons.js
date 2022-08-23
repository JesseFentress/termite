export const PaginationButtons = ({
    numberOfPages,
    onPagination
}) => {

    const generatePaginationButtons = () => {
        let rows = [];
        for (let i = 1; i <= numberOfPages; i++) {
            rows.push(
                <li
                    onClick={onPagination} 
                    className="page-item"
                    key={i}
                >
                    <a className="page-link" id={`linkPageIndex-${i}`} href="#" aria-label="">
                        <span aria-hidden="true" id={`spanPageIndex-${i}`}>{i}</span>
                    </a>
                </li>
            )
        }
        return (<ul className="pagination">{rows}</ul>);
    }

    return (
        <div className="mx-2 position-absolute bottom-0">
            <nav aria-label="Page navigation example">
                {generatePaginationButtons()}
            </nav>
        </div>
    );
};