
// // import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// // function AddModal({toggle,modal}) {
  
  
// //   return (
// //     <div>
    
// //       <Modal isOpen={modal} toggle={toggle} >
// //         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
// //         <ModalBody>
// //           hhhhhhhhhhhhhhhhhhhhhhh
// //           <input/>
// //         </ModalBody>
// //         <ModalFooter>
// //           <Button color="success" onClick={toggle}>
// //             Add 
// //           </Button>{' '}
// //           <Button color="secondary" onClick={toggle}>
// //             Cancel
// //           </Button>
// //         </ModalFooter>
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default AddModal;

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
// import { addProduct } from "../Slices/ProductSlice";
// import { fetchProducts } from "../Slices/ProductSlice";
// import { toast } from "react-toastify";

// function AddModal({ toggle, modal , handleEdit }) {
  
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     price: "",
//     oldPrice: "",
//     image: "",
//     category: "",
//     seller: "",
//     stock: "",
//     description: "",
//     ingredients: "",
//   });

  
//   const handleAddProduct = () => {
//     setFormData({
//         id: "",
//         name: "",
//         price: "",
//         oldPrice: "",
//         image: "",
//         category: "",
//         seller: "",
//         stock: "",
//         description: "",
//         ingredients: "",
//     });
    
//     toggle()
    
// };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

  
//   const dispatch = useDispatch()
  
//   // Handle image upload
//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

  
//   const handleSubmit = () => {

//     const formattedData = {
//       ...formData,
//       ingredients: formData.ingredients.split(",").map((item) => item.trim()),
//     };

//     const newProduct = {
//       name: formData.name,
//       price: parseFloat(formData.price),
//       oldPrice: parseFloat(formData.oldPrice) || null,
//       image: formData.image,
//       category: formData.category,
//       seller: formData.seller,
//       stock: parseInt(formData.stock),
//       description: formData.description,
//       ingredients: formData.ingredients,
//   };
//   dispatch(addProduct(newProduct))
//       .unwrap()
//       .then((response) => {
//           dispatch(fetchProducts({}))
//           toast.success("Product added successfully!" , response);
//       })
//       .catch((error) => {
//           toast.error(error);
//       });
//     console.log("Form Data Submitted:", formattedData);
//     toggle();
//   };

//   return (
//     <Modal isOpen={modal} toggle={toggle} >
//       <ModalHeader toggle={toggle} onClick={handleAddProduct}>Add New Product</ModalHeader>
//       <ModalBody>
//         <div className="space-y-4">
//           {/* Name */}
//           <Label>Name</Label>
//           <Input type="text" name="name" value={formData.name} onChange={handleChange} />

//           {/* Price */}
//           <Label>Price</Label>
//           <Input type="number" name="price" value={formData.price} onChange={handleChange} />

//           {/* Old Price */}
//           <Label>Old Price</Label>
//           <Input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} />

//           {/* Image Upload */}
//           <Label>Product Image</Label>
//           <Input type="file" name="image" onChange={handleImageChange} />

//           {/* Category */}
//           <Label>Category</Label>
//           <Input type="text" name="category" value={formData.category} onChange={handleChange} />

//           {/* Seller */}
//           <Label>Seller</Label>
//           <Input type="text" name="seller" value={formData.seller} onChange={handleChange} />

//           {/* Stock */}
//           <Label>Stock</Label>
//           <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />

//           {/* Description */}
//           <Label>Description</Label>
//           <Input type="textarea" name="description" value={formData.description} onChange={handleChange} />

//           {/* Ingredients */}
//           <Label>Ingredients (comma separated)</Label>
//           <Input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />

//           {/* Quantity */}
//           <Label>Quantity</Label>
//           <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         <Button color="success" onClick={handleSubmit}>
//           Add
//         </Button>
//         <Button color="secondary" onClick={toggle}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// }

// export default AddModal;

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
// import { addProduct, fetchProducts } from "../Slices/ProductSlice";
// import { toast } from "react-toastify";

// function AddModal({ toggle, modal, selectedProduct }) {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     oldPrice: "",
//     image: "",
//     category: "",
//     seller: "",
//     stock: "",
//     description: "",
//     ingredients: "",
//   });

//   useEffect(() => {
//     if (selectedProduct) {
//       setFormData({
//         ...selectedProduct,
//         ingredients: selectedProduct.ingredients ? selectedProduct.ingredients.join(", ") : "",
//       });
//     } else {
//       setFormData({
//         name: "",
//         price: "",
//         oldPrice: "",
//         image: "",
//         category: "",
//         seller: "",
//         stock: "",
//         description: "",
//         ingredients: "",
//       });
//     }
//   }, [selectedProduct]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     const formattedData = {
//       ...formData,
//       ingredients: formData.ingredients.split(",").map((item) => item.trim()),
//     };

//     if (selectedProduct) {
//       //  dispatch(updateProduct({ id: selectedProduct._id, ...formattedData }))
//       //    .unwrap()
//       //    .then(() => {
//       //      dispatch(fetchProducts({}));
//       //     toast.success("Product updated successfully!");
//       //   })
//       //   .catch((error) => {
//       //     toast.error(error);
//       //   });
//       console.log("update pro")
//     } else {
//       dispatch(addProduct(formattedData))
//         .unwrap()
//         .then(() => {
//           dispatch(fetchProducts({}));
//           toast.success("Product added successfully!");
//         })
//         .catch((error) => {
//           toast.error(error);
//         });
//     }

//     toggle();
//   };

//   return (
//     <Modal isOpen={modal} toggle={toggle}>
//       <ModalHeader toggle={toggle}>{selectedProduct ? "Edit Product" : "Add New Product"}</ModalHeader>
//       <ModalBody>
//         <Label>Name</Label>
//         <Input type="text" name="name" value={formData.name} onChange={handleChange} />

//         <Label>Price</Label>
//         <Input type="number" name="price" value={formData.price} onChange={handleChange} />

//         <Label>Old Price</Label>
//         <Input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} />

//         <Label>Category</Label>
//         <Input type="text" name="category" value={formData.category} onChange={handleChange} />
//       </ModalBody>
//       <ModalFooter>
//         <Button color="success" onClick={handleSubmit}>
//           {selectedProduct ? "Update" : "Add"}
//         </Button>
//         <Button color="secondary" onClick={toggle}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// }

// export default AddModal;


// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
// import { addProduct, fetchProducts } from "../Slices/ProductSlice";
// import { toast } from "react-toastify";

// function AddModal({ toggle, modal, selectedProduct }) {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     oldPrice: "",
//     image: "",
//     category: "",
//     seller: "",
//     stock: "",
//     description: "",
//     ingredients: "",
//   });

//   useEffect(() => {
//     if (selectedProduct) {
//       setFormData({
//         ...selectedProduct,
//         ingredients: selectedProduct.ingredients ? selectedProduct.ingredients.join(", ") : "",
//       });
//     } else {
//       setFormData({
//         name: "",
//         price: "",
//         oldPrice: "",
//         image: "",
//         category: "",
//         seller: "",
//         stock: "",
//         description: "",
//         ingredients: "",
//       });
//     }
//   }, [selectedProduct]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     const formattedData = {
//       ...formData,
//       ingredients: formData.ingredients.split(",").map((item) => item.trim()),
//     };

//     if (selectedProduct) {
//       console.log("update pro");
//     } else {
//       // dispatch(add(formattedData))
//       //   .unwrap()
//       //   .then(() => {
//       //     dispatch(fetchProducts({}));
//       //     toast.success("Product added successfully!");
//       //   })
//       //   .catch((error) => {
//       //     toast.error(error);
//       //   });
//       dispatch(addProduct(formattedData))
//     }

//     toggle();
//   };

//   return (
//     <Modal isOpen={modal} toggle={toggle}>
//       <ModalHeader toggle={toggle}>
//         {selectedProduct ? "Edit Product" : "Add New Product"}
//       </ModalHeader>
//       <ModalBody>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label>Name</Label>
//             <Input type="text" name="name" value={formData.name} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Category</Label>
//             <Input type="text" name="category" value={formData.category} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Price</Label>
//             <Input type="number" name="price" value={formData.price} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Old Price</Label>
//             <Input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Stock</Label>
//             <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Seller</Label>
//             <Input type="text" name="seller" value={formData.seller} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Image URL</Label>
//             <Input type="file" name="image" value={formData.image} onChange={handleChange} />
//           </div>
//           <div>
//             <Label>Ingredients (comma-separated)</Label>
//             <Input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="mt-4">
//           <Label>Description</Label>
//           <Input type="textarea" name="description" value={formData.description} onChange={handleChange} rows="3" />
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         <Button color="success" onClick={handleSubmit}>
//           {selectedProduct ? "Update" : "Add"}
//         </Button>
//         <Button color="secondary" onClick={toggle}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// }

// export default AddModal;


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { addProduct, editProduct, fetchProducts } from "../Slices/ProductSlice";
import { toast } from "react-toastify";

function AddModal({ toggle, modal, selectedProduct }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: null, // Fix: Store file object instead of a string
    category: "",
    seller: "",
    stock: "",
    description: "",
    ingredients: "",
  });

  // Set form data when editing an existing product
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        ...selectedProduct,
        ingredients: selectedProduct.ingredients ? selectedProduct.ingredients.join(", ") : "",
        image: null, // Reset image field
      });
    } else {
      setFormData({
        name: "",
        price: "",
        oldPrice: "",
        image: null,
        category: "",
        seller: "",
        stock: "",
        description: "",
        ingredients: "",
      });
    }
  }, [selectedProduct]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] }); // Store file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()), // Convert string to array
    };

    if (selectedProduct) {
      console.log("Update product logic here...");
      
      dispatch(editProduct({ id: selectedProduct._id , data: formattedData }))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts({}));
        toast.success("Product updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update product.");
      });
      
      
    } else {
      dispatch(addProduct(formattedData))
        .unwrap()
        .then(() => {
          dispatch(fetchProducts({}));
          toast.success("Product added successfully!");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to add product.");
        });
    }

    toggle(); // Close modal after submission
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {selectedProduct ? "Edit Product" : "Add New Product"}
      </ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Category</Label>
            <Input type="text" name="category" value={formData.category} onChange={handleChange} />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <Label>Old Price</Label>
            <Input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} />
          </div>
          <div>
            <Label>Stock</Label>
            <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
          </div>
          <div>
            <Label>Seller</Label>
            <Input type="text" name="seller" value={formData.seller} onChange={handleChange} />
          </div>
          <div>
            <Label>Image</Label>
            <Input type="file" name="image" onChange={handleChange} />
          </div>
          <div>
            <Label>Ingredients (comma-separated)</Label>
            <Input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-4">
          <Label>Description</Label>
          <Input type="textarea" name="description" value={formData.description} onChange={handleChange} rows="3" />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSubmit}>
          {selectedProduct ? "Update" : "Add"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddModal;
