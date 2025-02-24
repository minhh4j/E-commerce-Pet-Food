import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct,} from "../Slices/ProductSlice";
import AddModal from "./Modal";

function HandleProducts() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggle = () => setModal(!modal);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModal(true);
  };

  const { products, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchProducts({ page: currentPage + 1, limit: 10 }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchProducts({ page: currentPage - 1, limit: 10 }));
    }
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <>
     <AddModal toggle={toggle} modal={modal} selectedProduct={selectedProduct} />
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700" onClick={handleAddProduct}>
          <IoAddCircleOutline className="mr-2 text-xl" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-blue-600">Loading products...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {/* Product Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="text-white bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products.map((item , index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-16 h-16 rounded-md shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.stock}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && (
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default HandleProducts;



