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
        GET_ALL: '/users/wishlist',
        ADD: (productId) => `/users/wishlist/${productId}`,
        REMOVE: (productId) => `/users/wishlist/${productId}`,
        CLEAR: '/users/wishlist',
    },
    CART: {
        GET_ALL: '/user/cart',
        ADD_TO_CART: (productId) => `/user/cart/${productId}`,
        REMOVE_PRODUCT: (productId) => `/user/cart/${productId}`,
        UPDATE_QUANTITY: (productId, action) => `/user/cart/${productId}/${action}`,
    },
}

