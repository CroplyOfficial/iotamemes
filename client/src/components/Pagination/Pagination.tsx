import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./pagination.css";

interface PageNumbers {
	middle: number[];
	lastPage: number;
}
const Pagination = ({
	totalMemes,
	memesPerPage,
	paginate,
	currentPage,
}: {
	totalMemes: number;
	memesPerPage: number;
	paginate: (number: number) => any;
	currentPage: number;
}) => {
	const [pageNums, setPageNums] = useState<PageNumbers>({
		middle: [],
		lastPage: 0,
	});
	const getNormal = (lastPage: number) => {
		const half = lastPage / 2;
		const below = half - 1 > 1 ? half - 1 : -1;
		const above = half + 1 > 1 ? half + 1 : -1;
		return [below, half, above];
	};

	const addLess = () => {
		const [least, ..._] = pageNums.middle;
		const leastMinus3 = least - 3 > 1 ? least - 3 : 1;
		if (_.includes(3)) return;
		const middle = Array.from(
			new Set([leastMinus3, leastMinus3 + 1, leastMinus3 + 2, ..._]),
		);

		setPageNums({
			...pageNums,
			middle: middle.slice(0, 7),
		});
	};
	const addMore = () => {
		const max = pageNums.middle[pageNums.middle.length - 1];
		const maxAbove3 = max + 3 > 1 ? max + 3 : 1;
		if (pageNums.middle.includes(pageNums.lastPage - 1)) return;
		const middle = Array.from(
			new Set([...pageNums.middle, maxAbove3 - 2, maxAbove3 - 1, maxAbove3]),
		);

		setPageNums({
			...pageNums,
			middle: middle.slice(Math.max(middle.length - 7, 0)),
		});
	};

	const nextPage = () => {
		const next = currentPage + 1;
		if (next > pageNums.lastPage) return;
		paginate(currentPage + 1);
	};
	const prevPage = () => {
		const next = currentPage - 1;
		if (next < 1) return;
		paginate(currentPage - 1);
	};

	useEffect(() => {
		let pageNumbers: number[] = [];
		for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
			pageNumbers.push(i);
		}

		const middle = getNormal(pageNums.lastPage);
		setPageNums({ middle: middle, lastPage: pageNumbers.length });
	}, [pageNums.lastPage]);
	useEffect(() => {
		console.log(pageNums);
	}, [pageNums]);

	return (
		<nav
			className="pagination is-centered my__pagination"
			role="navigation"
			aria-label="pagination"
			style={{ marginTop: "50px" }}
		>
			<a className="pagination-previous my__pagination" onClick={prevPage}>
				Previous
			</a>
			<a className="pagination-next my__pagination" onClick={nextPage}>
				Next page
			</a>
			<ul className="pagination-list ">
				<li>
					<a
						className="pagination-link my__pagination"
						aria-label="Goto page 1"
						onClick={(e) => {
							paginate(1);
						}}
					>
						1
					</a>
				</li>
				<li onClick={addLess}>
					<span className="pagination-ellipsis">&hellip;</span>
				</li>
				{pageNums.middle?.map((page) => (
					<li>
						<a
							className="pagination-link my__pagination"
							aria-label={"Goto page " + page}
							key={page}
							onClick={(e) => {
								paginate(page);
							}}
						>
							{page}
						</a>
					</li>
				))}
				<li onClick={addMore}>
					<span className="pagination-ellipsis">&hellip;</span>
				</li>
				<li>
					<a
						className="pagination-link my__pagination"
						aria-label={"Goto page " + pageNums.lastPage}
						onClick={(e) => {
							paginate(pageNums.lastPage);
						}}
					>
						{pageNums.lastPage}
					</a>
				</li>
			</ul>
		</nav>
	);

	/*
	return (
		<div className="pagination">
			{pageNums.map((number: number) => (
				<div
					key={number}
					className="pageNum"
					onClick={(e) => {
						paginate(number);
					}}
				>
					{number}
				</div>
			))}
		</div>
	);
   */
};

export default Pagination;
