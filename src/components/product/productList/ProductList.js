import { Spinner } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "./ProductList.scss";
import Search from "../../search/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { formatNumbers } from "../productSummary/ProductSummary";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

export default function ProductList({ products, isLoading }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  function shortenText(text, n) {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  }

  function onChange(e) {
    return;
  }

  // BEGINNING PAGINATION
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // END BEGINNING PAGINATION

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  async function delProduct(id) {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  }

  function confirmDelete(id) {
    confirmAlert({
      title: "Delete Product",
      message: `Are you sure you want to delete this product?`,
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  }

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <Spinner />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No Product found. Please, add a product!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1} </td>
                      <td>{shortenText(name, 16)} </td>
                      <td>{category} </td>
                      <td>$ {formatNumbers(price)} </td>
                      <td>{quantity} </td>
                      <td>$ {formatNumbers((price * quantity).toFixed(2))} </td>
                      <td className="icons">
                        <Link to={`/product-detail/${_id}`}>
                          <AiOutlineEye size={25} color={"purple"} />
                        </Link>
                        <Link to={`/edit-product/${_id}`}>
                          <FaEdit size={20} color={"green"} />
                        </Link>
                        <FaTrashAlt
                          onClick={() => confirmDelete(_id)}
                          size={20}
                          color={"red"}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
}
