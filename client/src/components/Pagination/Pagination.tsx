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
}: {
	totalMemes: number;
	memesPerPage: number;
	paginate: (number: number) => any;
}) => {
	const [pageNums, setPageNums] = useState<PageNumbers>({
		middle: [],
		lastPage: 1,
	});
	console.log(totalMemes, memesPerPage);

	useEffect(() => {
		let pageNumbers: number[] = [];
		for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
			pageNumbers.push(i);
		}

		const half = pageNumbers.length / 2;
		const below = half - 1 > 1 ? half - 1 : -1;
		const above = half + 1 > 1 ? half + 1 : -1;
		const newPageNumbers = [below, half, above];

		setPageNums({ middle: [below, half, above], lastPage: pageNumbers.length });
	}, []);

	useEffect(() => {
		console.log("pageNums", pageNums);
	}, [pageNums]);

	return (
		<nav
			className="pagination is-centered my__pagination"
			role="navigation"
			aria-label="pagination"
			style={{ marginTop: "50px" }}
		>
			<a className="pagination-previous my__pagination">Previous</a>
			<a className="pagination-next my__pagination">Next page</a>
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
				<li>
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
				<li>
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
