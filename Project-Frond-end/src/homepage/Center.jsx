import { useEffect, useState, useRef, useMemo } from "react";
import ProductModal from "./ProductInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../Slices/ProductSlice";
import { addToCart } from "../Slices/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import { AiFillHeart } from "react-icons/ai";
import { addProductToWishlist, getUserWishlist } from "../Slices/WishlistSlice";

function Center() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();
  const { products, loading, currentPage, error, totalPages } = useSelector(
    (state) => state.products
  );
  // const searchQuery = useSelector((state) => state.search.query);
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.category === selectedCategory)
      );
    }
  });

  const handleAddToCartClick = async (product) => {
    dispatch(addToCart(product._id)).then((response) => {
      if (response?.payload) {
        toast.error(response.payload);
      }
      if (response?.payload?.message) {
        toast.success(response?.payload?.message);
      }
    });
  };

  const handleAddToWishlist = (product) => {
    dispatch(addProductToWishlist(product._id)).then((response) => {
        if (response.payload.wishlist?.message) {
            toast.info(response.payload.wishlist?.message);
        } else {
            toast.success("Added to wishlist, available under profile");
        }
        dispatch(getUserWishlist())
    });
};
  
  
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  // Handle Category Change & Play Sound
  const catAudioRef = useRef(null);
  const dogAudioRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    dispatch(fetchProducts({ page: 1, category }));

    if (category === "cat") catAudioRef.current?.play();
    if (category === "dog") dogAudioRef.current?.play();
  };

  return (
    <div className="container py-4">
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h4 className="text-2xl font-semibold text-center text-gray-700">
        <i>"Select Category"</i>
      </h4>

      {/* Category Selection */}
      <div className="flex justify-center mb-4">
        {/* All Button */}
        <button
          className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
            selectedCategory === "all" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("all")}
        >
          <img
            src="https://img.freepik.com/free-photo/cat-love-being-affectionate-towards-each-other_23-2150984513.jpg?t=st=1735550783~exp=1735554383~hmac=4bd03b88f2ad1748c48520e49888de55f59cc17b567c3badda2fc780f1b80ae4&w=900"
            alt="All"
            className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
          />
        </button>

        {/* Cat Button */}
        <button
          className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
            selectedCategory === "cat" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("cat")}
        >
          <img
            src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?t=st=1735549987~exp=1735553587~hmac=c26a0ccb15950eda4dd50c45d854f1c3bed383fda8cebe3785c8c13238e7e81b&w=360"
            alt="Cat"
            className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
          />
        </button>
        <audio ref={catAudioRef} src="/assets/cat-sound.wav"></audio>

        {/* Dog Button */}
        <button
          className={`flex items-center justify-center w-16 h-16 mx-2 rounded-full shadow-md hover:scale-110 hover:shadow-2xl transition-all ${
            selectedCategory === "dog" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("dog")}
        >
          <img
            src="https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1735550719~exp=1735554319~hmac=fab93c7f811eeb1fc23b6913c78f694c409eaa017cb7f0e51262784e9d5d7d59&w=740"
            alt="Dog"
            className="object-cover w-full h-full transition-all rounded-full hover:scale-110 hover:shadow-2xl"
          />
        </button>
        <audio ref={dogAudioRef} src="/assets/dog-sound.wav"></audio>
      </div>

      <audio ref={catAudioRef} src="/assets/cat-sound.wav"></audio>
      <audio ref={dogAudioRef} src="/assets/dog-sound.wav"></audio>

      {/* Loading & Error Handling */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <h1 className="text-xl font-semibold">Loading products...</h1>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20">
          <h1 className="text-xl font-semibold text-red-600">Error: {error}</h1>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {filteredProducts.map((item) => (
              <div className="flex justify-center" key={item.id}>
                <div className="w-40 h-full overflow-hidden transition-transform duration-300 rounded-lg shadow-md bg-sky-300 card hover:scale-105 hover:shadow-xl ">
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => setSelectedProduct(item)}
                    className="object-cover"
                  />
                  <div className="p-3 text-center">
                    <h6 className="text-sm font-semibold">{item.name}</h6>
                    <p className="mb-1 text-sm text-primary">₹{item.price}</p>
                    {item.oldPrice && (
                      <p className="text-xs text-gray-500 line-through">
                        ₹{item.oldPrice}
                      </p>
                    )}
                    <button
                      className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-900 hover:text-white"
                      onClick={() => handleAddToCartClick(item)}
                    >
                      Add to Cart
                    </button>
                    <br />
                    <br />
                    <button onClick={() => handleAddToWishlist(item)}>
                    <AiFillHeart size='1em' className="text-blue-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product Modal */}
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => dispatch(setPage(currentPage - 1))}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 text-gray-700 transition bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => dispatch(setPage(currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 text-gray-700 transition bg-blue-200 rounded-md disabled:opacity-50 hover:bg-blue-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Center;






