export const endpoint = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        ME: '/me'
    },
    PRODUCT: {
        GET_PRODUCTS: '/products',          
        GET_BY_ID: (id) => `/products/${id}`,
        SEARCH: '/products/search',        
    },
    WISHLIST: {
        GET_ALL: '/user/wishlist',
        ADD: (productId) => `/user/wishlist/${productId}`,
        REMOVE: (productId) => `/user/wishlist/${productId}`,
    },
    CART: {
        GET_ALL: '/user/cart',
        ADD_TO_CART: (productId) => `/user/cart/${productId}`,
        REMOVE_PRODUCT: (productId) => `/user/cart/${productId}`,
        UPDATE_QUANTITY: (productId, action) => `/user/cart/${productId}/${action}`,
    },
    ORDER: {
        CREATE: '/user/order/create',
        VERIFY_PAYMENT: '/user/verify-payment',
        GET_USER_ORDERS: '/user/order',
      },
      ADMIN: {
        USERS: {
          GET_ALL: '/admin/users',
          GET_BY_ID: (id) => `/admin/users/${id}`,
          BLOCK_UNBLOCK: (id) => `/admin/users/${id}/block-unblock`,
        },
        CART: {
          GET_CART_FOR_USER: (id) => `/users/cart/${id}`
        },
        ORDERS: {
          GET_ALL: '/admin/orders',
          GET_BY_ID: (id) => `/admin/orders/${id}`,
        },
        REVENUE: {
          GET_TOTAL: '/admin/revanue',
        },
        STATISTICS: {
          GET_TOP_SELLING_PRODUCTS: '/admin/top-selling-products',
        },
        PRODUCTS: {
          ADD: '/admin/addproducts',
          EDIT: (id) => `/admin/updateproduct/${id}`,
          DELETE: (id) => `/admin/deleteproduct/${id}`,
        }
      }
}
